import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

const pageModel = mongoose.model("Page", pageSchema);

export default pageModel;
