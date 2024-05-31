const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getProduct,
  getSingleProduct,
  getDeleteProduct,
} = require("../controllers/productController");
const { isAuthorized } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", protect, getProduct);
router.get("/:id", protect, getSingleProduct);
router.delete("/:id", isAuthorized, getDeleteProduct);

module.exports = router;
