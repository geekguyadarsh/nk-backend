const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getCategory,
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// Create Category
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//GET A CATEGORY
router.get("/category/:categoryId", getCategory);

//GET ALL CATEGORIES
router.get("/categories", getAllCategories);

//Edit category
router.put(
  "/category/:userId/:categoryId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//Delete Category
router.delete(
  "/category/:userId/:categoryId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;
