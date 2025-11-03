import { useState } from 'react';
import { supabase } from '../lib/supabase';
import './AdminUpload.css';

export default function AdminUpload() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const uploadImage = async (event) => {
    try {
      setUploading(true);
      setMessage('');

      const files = event.target.files;
      if (!files || files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = file.name;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) {
          throw uploadError;
        }

        return filePath;
      });

      await Promise.all(uploadPromises);

      setMessage(`Successfully uploaded ${files.length} image(s)!`);
      event.target.value = '';
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  };

  const getPublicUrl = async () => {
    const fileName = prompt('Enter the exact filename (e.g., ELJARDIN0A04.jpg):');
    if (!fileName) return;

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    setMessage(`Public URL: ${data.publicUrl}`);
  };

  return (
    <div className="admin-upload">
      <div className="admin-upload-card">
        <h2>Upload Product Images</h2>
        <p className="admin-upload-description">
          Upload your product images to Supabase Storage. You can select multiple files at once.
        </p>

        <div className="admin-upload-section">
          <label htmlFor="image-upload" className="admin-upload-label">
            {uploading ? 'Uploading...' : 'Choose Images'}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={uploadImage}
            disabled={uploading}
            className="admin-upload-input"
          />
        </div>

        {message && (
          <div className={`admin-upload-message ${message.includes('Success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="admin-upload-helper">
          <button onClick={getPublicUrl} className="admin-upload-button">
            Get Image URL
          </button>
          <p className="admin-upload-hint">
            After uploading, use this to get the public URL for a specific image
          </p>
        </div>

        <div className="admin-upload-instructions">
          <h3>How to use:</h3>
          <ol>
            <li>Click "Choose Images" and select one or multiple product photos</li>
            <li>Wait for the upload to complete</li>
            <li>The images will be stored in Supabase Storage</li>
            <li>Use "Get Image URL" to get the public URL for any uploaded image</li>
            <li>Copy the URL and update your products in the database</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
