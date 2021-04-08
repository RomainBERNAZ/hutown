import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price:{
    Small: { type: Number, required: false },
    Medium: { type: Number, required: false },
    Large: { type: Number, required: false },
    Xtra: { type: Number, required: false },
  },
  size: {
    Small: { type: String, required: false },
    Medium: { type: String, required: false },
    Large: { type: String, required: false },
    Xtra: { type: String, required: false },
  },
  description: { type: String, required: true },
  lieu: { type: String, required: true },
  papier: { type: String, required: true },
  livraison: { type: String, required: true },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
