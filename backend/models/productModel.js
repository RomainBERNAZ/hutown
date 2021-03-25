import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priceS: { type: Number, required: false },
  priceM: { type: Number, required: false },
  priceL: { type: Number, required: false },
  priceX: { type: Number, required: false },
  sizeS: { type: String, required: false },
  sizeM: { type: String, required: false },
  sizeL: { type: String, required: false },
  sizeX: { type: String, required: false },
  description: { type: String, required: true },
  lieu: { type: String, required: true },
  papier: { type: String, required: true },
  livraison: { type: String, required: true },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
