import dotenv from 'dotenv'
dotenv.config()

import {Cloudinary} from "cloudinary-core";  

var cl = new Cloudinary({
    cloud_name: 'drefurx4l',
    api_key: '394767766592868',
    api_secret: '1zTfp--_hcBGyVjbOJx-u2ZO8Y8'
});

export default cl;