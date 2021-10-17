const CarouselBanner = require("../models/carouselBanner");

exports.getcarouselBannerById = (req, res, next, id) => {
  CarouselBanner.findById({ _id: id })
  .exec((err, carouselBanner) => {
    if (err) {
      return res.status(400).json(err);
    }
    req.carouselBanner = carouselBanner;
    next();
  });
};

exports.carouselBanner = (req, res) => {
  let image = req.file.filename;
  if (req.body) {
    let url = req.body;
  }
  carouselBanner = new CarouselBanner({
    image,
    url,
  });
};

exports.getAllCarouselBanner = (req, res) => {
  CarouselBanner.find().exec((err, carouselBanners) => {
    if (err) {
      return res.status(400).json({ error: "No banners found" });
    }

    return res.json(carouselBanners);
  });
};

exports.deleteCarouselBanner = (req, res) => {
  let carouselBannerId = req.carouselBanner._id;

  CarouselBanner.findByIdAndDelete(carouselBannerId).then(
    (err, carouselBanner) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "Carousel Banner deletion failed" });
      }
      return res.json({
        message: "Carousel Banner deletion successful",
      });
    }
  );
};
