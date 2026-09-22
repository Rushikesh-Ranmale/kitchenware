
const express = require("express");

const {
  authenticate,
  adminOnly,
} = require("../middleware/auth");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// Customer creates an order
router.post(
  "/",
  authenticate,
  createOrder
);

// Customer gets their own orders
router.get(
  "/my",
  authenticate,
  getMyOrders
);

// Admin gets all orders
router.get(
  "/",
  authenticate,
  adminOnly,
  getAllOrders
);

// Admin updates order status
router.put(
  "/:id/status",
  authenticate,
  adminOnly,
  updateOrderStatus
);

module.exports = router;

