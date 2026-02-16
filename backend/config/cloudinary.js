import { v2 as cloudinary } from 'cloudinary';

let isCloudinaryConfigured = false;

const cloudinaryConnect = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.warn('Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to enable media uploads.');
    return null;
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  isCloudinaryConfigured = true;
  console.log('Cloudinary configured');
  return cloudinary;
};

export const getCloudinary = () => (isCloudinaryConfigured ? cloudinary : null);

export default cloudinaryConnect;
