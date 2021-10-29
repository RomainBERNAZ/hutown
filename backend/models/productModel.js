import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image : { type: String, required: true},
  price:{
    Small: { type: Number, required: false },
    Medium: { type: Number, required: false },
  },
  size: {
    Small: { type: String, required: false },
    Medium: { type: String, required: false },
  },
  description: { type: String, required: true },
  artiste: { type: String, required: true }

});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
