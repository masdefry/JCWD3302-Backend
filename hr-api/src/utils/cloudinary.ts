import { v2 as cloudinary, UploadStream } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export const cloudinaryUpload = async (file: Buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'evidence',
      },
      (error, result?) => {
        if (error) {
          return reject(error);
        }
        resolve({ res: result?.secure_url });
      }
    ).end(file);
  });
};
