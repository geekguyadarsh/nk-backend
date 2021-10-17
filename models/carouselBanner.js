const mongoose = require("mongoose");

const carouselBanner = new Schema({
  image: {
    type: String,
  },

  url: {
    type: String,
  },
});

module.exports = mongoose.model("CarouselBanner", carouselBanner);
