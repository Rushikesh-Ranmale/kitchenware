
const express = require("express");

const {
  authenticate,
  adminOnly,
} = require("../middleware/auth");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
  "/stats",
  authenticate,
  adminOnly,
  getDashboardStats
);

module.exports = router;
