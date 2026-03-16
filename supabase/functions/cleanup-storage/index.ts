import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all files from storage
    const { data: allFiles, error: listError } = await supabase
      .storage
      .from('product-images')
      .list('', { limit: 1000 });

    if (listError) {
      throw new Error(`Failed to list files: ${listError.message}`);
    }

    // Get all image URLs currently used in products table
    const { data: products, error: dbError } = await supabase
      .from('products')
      .select('image_url, thumbnail_url');

    if (dbError) {
      throw new Error(`Failed to fetch products: ${dbError.message}`);
    }

    // Extract filenames from URLs
    const usedFiles = new Set<string>();
    products?.forEach((product) => {
      if (product.image_url) {
        const filename = product.image_url.split('/').pop()?.split('?')[0];
        if (filename) usedFiles.add(filename);
      }
      if (product.thumbnail_url) {
        const filename = product.thumbnail_url.split('/').pop()?.split('?')[0];
        if (filename) usedFiles.add(filename);
      }
    });

    // Find orphaned files
    const orphanedFiles = allFiles
      ?.filter(file => !usedFiles.has(file.name))
      .map(file => file.name) || [];

    if (orphanedFiles.length === 0) {
      return new Response(
        JSON.stringify({
          message: 'No orphaned files found',
          totalFiles: allFiles?.length || 0,
          usedFiles: usedFiles.size,
          orphanedFiles: 0
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Delete orphaned files (in batches of 50)
    const deletedFiles: string[] = [];
    const failedFiles: string[] = [];

    for (let i = 0; i < orphanedFiles.length; i += 50) {
      const batch = orphanedFiles.slice(i, i + 50);

      const { data, error } = await supabase
        .storage
        .from('product-images')
        .remove(batch);

      if (error) {
        failedFiles.push(...batch);
        console.error('Batch delete error:', error);
      } else {
        deletedFiles.push(...batch);
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Cleanup completed',
        totalFiles: allFiles?.length || 0,
        usedFiles: usedFiles.size,
        orphanedFiles: orphanedFiles.length,
        deletedFiles: deletedFiles.length,
        failedFiles: failedFiles.length,
        deleted: deletedFiles,
        failed: failedFiles
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Cleanup error:', error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
