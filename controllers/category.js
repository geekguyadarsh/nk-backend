const Category = require("../models/Category");

//middleware
exports.getCategoryById = (req, res, next, id) => {
  Category.findById({ _id: id }).exec((err, category) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    req.category = category;
    next();
  });
};

//Create Category
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to create category",
      });
    }
    return res.json({
      message: `Successfully created ${category.name} category`,
    });
  });
};

//Get a category
exports.getCategory = (req, res) => {
  return res.json(req.category);
};

//Get all Categories
exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.json(categories);
  });
};

//Update category
exports.updateCategory = (req, res) => {
  Category.findByIdAndUpdate(
    req.category._id,
    {
      $set: req.body,
    },
    { new: true },
    (err, category) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.json(category);
    }
  );
};

//Delete a category
exports.deleteCategory = (req, res) => {
  Category.findByIdAndDelete(req.category._id, (err, category) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.json({
      message: `successfully deleted ${category.name} category`,
    });
  });
};
