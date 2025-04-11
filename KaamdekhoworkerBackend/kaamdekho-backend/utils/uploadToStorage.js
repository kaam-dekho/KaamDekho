const supabase = require('../supabase/supabaseClient');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

async function uploadToStorage(file, folderName) {
  if (!file) return null;

  const fileExt = path.extname(file.originalname);
  const fileName = `${uuidv4()}${fileExt}`;

  const { data, error } = await supabase.storage
    .from('media') // replace with your actual bucket name
    .upload(`${folderName}/${fileName}`, fs.readFileSync(file.path), {
      contentType: file.mimetype,
    });

  if (error) {
    console.error('Upload error:', error.message);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from('media') // same bucket name
    .getPublicUrl(`${folderName}/${fileName}`);

  return publicUrlData.publicUrl;
}

module.exports = uploadToStorage;
