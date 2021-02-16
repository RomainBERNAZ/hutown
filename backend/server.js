import express from 'express';
import config from './config.js'
import dotenv from 'dotenv'
import * as path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js';
import pageRoute from './routes/pageRoute.js';
import uploadRoute from './routes/uploadRoute.js'
import paiementRoute from './routes/paiementRoute.js'
import { createRequire } from 'module';

dotenv.config();
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const app = express();
const mongodbUrl = config.MONGODB_URL;


mongoose.connect(process.env.MONGODB_URI || mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));
 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/users', userRoute)
app.use('/api', productRoute)
app.use('/api', pageRoute)
app.use('/api', uploadRoute)
app.use('/api', paiementRoute)





app.listen(PORT, () => {console.log("Le serveur a bien démarré sur le port 5000")});