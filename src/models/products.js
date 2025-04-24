import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Image: { type: String, required: true },
  price: { type: Number, required: true },
  discountprice: { type: Number },
  quntity: { type: String, required: true },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product; // ✅ default export
