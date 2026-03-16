/*
  # Remove secondary images from sold items

  1. Changes
    - Update all sold products to remove their secondary_image_url
    - Sets secondary_image_url to empty string for products where sold = true
  
  2. Purpose
    - Reduce database storage size by removing unnecessary image references
    - Sold items no longer need secondary images for display
  
  3. Impact
    - Only affects products marked as sold
    - Active products retain their secondary images
*/

UPDATE products
SET secondary_image_url = ''
WHERE sold = true AND secondary_image_url != '';