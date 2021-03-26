import mongoose from "mongoose";

const histoireSchema = new mongoose.Schema({
  description: { type: String, required: true },
});

const histoireModel = mongoose.model("Histoire", histoireSchema);

export default histoireModel;