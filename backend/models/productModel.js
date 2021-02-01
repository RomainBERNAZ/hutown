import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: false},
    description: { type: String, required:false},
})

const productModel = mongoose.model("Product", productSchema);

export default productModel; 