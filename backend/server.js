//const express = require('express')
//const config =require('./config')
//const dotenv =require('dotenv')
//const mongoose =require('mongoose')
//const userRoute =require('./routes/userRoute')
//const productRoute=require('./routes/productRoute')
//const pageRoute =require('./routes/pageRoute')
//const uploadRoute =require('./routes/uploadRoute')
//
import express from 'express';
import config from './config'
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js';
import pageRoute from './routes/pageRoute.js';
import uploadRoute from './routes/uploadRoute.js'

dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(process.env.MONGODB_URI || mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));
 
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/users', userRoute)
app.use('/api', productRoute)
app.use('/api', pageRoute)
app.use('/api', uploadRoute)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'))
}


app.listen(PORT, () => {console.log("Le serveur a bien démarré sur le port 5000")});