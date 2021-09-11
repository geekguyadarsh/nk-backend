const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: ObjectId,
    ref: "Category",
  },

  inStock: {
    type: Boolean,
    required: true,
  },

  sold: {
    type: Number,
    default: 0,
  },

  images: [{ imgUrl: { type: String } }],
});
