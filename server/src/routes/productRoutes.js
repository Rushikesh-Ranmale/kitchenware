
const express = require("express");

const {
  authenticate,
  adminOnly,
} = require("../middleware/auth");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin routes
router.post(
  "/",
  authenticate,
  adminOnly,
  createProduct
);

router.put(
  "/:id",
  authenticate,
  adminOnly,
  updateProduct
);

router.delete(
  "/:id",
  authenticate,
  adminOnly,
  deleteProduct
);

module.exports = router;

