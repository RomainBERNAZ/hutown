import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    priceSm: { type: Number, required: true},
    priceM: { type: Number, required: true},
    priceL: { type: Number, required: true},
    priceXl: { type: Number, required: true},
    description: { type: String, required:true},
})

const productModel = mongoose.model("Product", productSchema);

export default productModel; 