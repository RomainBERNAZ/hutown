import dotenv from 'dotenv'
dotenv.config()

import cloudinary from 'cloudinary';

const cl = new cloudinary.v2;
cl.config({
    cloud_name: 'drefurx4l',
    api_key: '394767766592868',
    api_secret: '1zTfp--_hcBGyVjbOJx-u2ZO8Y8'
});

export default cl;