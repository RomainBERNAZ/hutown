import dotenv from 'dotenv'
dotenv.config()

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'drefurx4l',
    api_key: '394767766592868',
    api_secret: '1zTfp--_hcBGyVjbOJx-u2ZO8Y8'
});
 
export default cloudinary;