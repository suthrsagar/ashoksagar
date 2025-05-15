import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  quantity: { type: String },
  image: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

const Product = mongoose.model("Product", productSchema);

export default Product;  // default export
