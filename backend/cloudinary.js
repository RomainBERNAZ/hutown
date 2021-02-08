import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
dotenv.config()

cloudinary.config({
    cloud_name: 'drefurx4l',
    api_key: '394767766592868',
    api_secret: '1zTfp--_hcBGyVjbOJx-u2ZO8Y8'
});

export default cloudinary;