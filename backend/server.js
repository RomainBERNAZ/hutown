import express from 'express';
import config from './config'
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute';
import pageRoute from './routes/pageRoute';
import uploadRoute from './routes/uploadRoute'

dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));
 
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/users', userRoute)
app.use('/api', productRoute)
app.use('/api', pageRoute)
app.use('/api', uploadRoute)


app.listen(5000, () => {console.log("Le serveur a bien démarré sur le port 5000")});