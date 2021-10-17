const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { createCarouselBanner } = require("../controllers/carouselBanner");

//Multer Requirements
const path = require("path");
const multer = require("multer");
const shortid = require("shortid");
const { getUserById } = require("../controllers/user");

//Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "/uploads/carouselAsset"));
  },

  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

//Params
router.param("carouselBannerId", getcarouselBannerById);
router.param("userId", getUserById);

//Routes
router.post(
  "/carouselbanner/add",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  upload.single("banner"),
  createCarouselBanner
);
