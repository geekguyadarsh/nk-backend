const express = require("express");
const router = express.Router();

//Multer Requirements
const path = require("path");
const multer = require("multer");
const shortid = require("shortid");

const { isAdmin, isSignedIn, isAuthenticated } = require("../controllers/auth");
const {
  createProduct,
  getAllProducts,
  getProductById,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");

//Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "/uploads/productAsset"));
  },

  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

//Params
router.param("productId", getProductById);
router.param("userId", getUserById);

//Routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  createProduct
);

router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

router.get("/products", getAllProducts);

router.get("/product/:productId", getProduct);

module.exports = router;
