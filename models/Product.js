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

  category: [
    {
      type: ObjectId,
      ref: "Category",
    },
  ],

  sizes: {
    type: Array,
    default: [],
  },

  colors: {
    type: Array,
    default: [],
  },

  stock: {
    type: Number,
    required: true,
  },

  sold: {
    type: Number,
    default: 0,
  },

  images: [{ image: { type: String } }],
});

module.exports = mongoose.model("Product", productSchema);
