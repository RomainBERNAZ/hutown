import mongoose from 'mongoose';

const photographSchema = new mongoose.Schema({
    name:{ type: String, required:true},
    image: { type: String, required:false},
    description: { type: String, required:false},
    category: { type: String, required: true}
})

const photographModel = mongoose.model('Photograph', photographSchema);

export default photographModel; 