const mongoose = require("mongoose");
const Category = require("./Category");
const Image = require("./Image");
let productSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  image: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  desciption: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  purchaseCount: {
    type: Number,
    require: true,
  },
  seller: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Product", productSchema);
