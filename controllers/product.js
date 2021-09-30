const Product = require("../models/product.js");

exports.getProductById = (req, res, next, id) => {
  Product.findById({ _id: id })
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json(err);
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  const { name, description, price, category, stock } = req.body;
  let images = [];

  if (!req.files) {
    return res.status(400).json({ error: "Please upload at least one image" });
  }
  images = req.files.map((file) => {
    return { image: file.filename };
  });

  const product = new Product({
    name,
    description,
    price,
    category,
    stock,
    images,
  });
  product.save((err, product) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.json({ message: "Product creation successful", product });
  });
};

exports.getAllProducts = (req, res) => {
  Product.find()
    .populate("category")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No products found",
        });
      }
      return res.json(products);
    });
};

exports.getProductById = (req, res, next, id) => {
  Product.findById({ _id: id })
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(404).json({ error: "Can't fetch product" });
      }
      req.product = product;
      next();
    });
};

exports.getProduct = (req, res) => {
  return res.json(req.product);
};

exports.updateProduct = (req, res) => {
  let productId = req.product._id;
  Product.findByIdAndUpdate(
    productId,
    { $set: req.body },
    { new: true },
    (err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product updation failed",
        });
      }
      return res.json(product);
    }
  );
};

exports.deleteProduct = (req, res) => {
  let productId = req.product._id;

  Product.findByIdAndDelete(productId).then((err, product) => {
    if (err) {
      return res.status(400).json({ error: "Product deletion failed" });
    }
    return res.json({
      message: "Product deletion successful",
    });
  });
};
