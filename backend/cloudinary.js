import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import dotenv from 'dotenv'
dotenv.config()

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'hippolythe',
    api_key: '188214897979445',
    api_secret: 'fuTa7pdpw8r3UOS2KloKHSbhGfc'
});
 
export default cloudinary;