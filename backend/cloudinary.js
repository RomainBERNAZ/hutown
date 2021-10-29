import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import dotenv from 'dotenv'
dotenv.config()

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
});
 
export default cloudinary;