const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getDatas,
  addDatas,
  getData,
  deleteData,
} = require("../controllers/dataControllers");
const router = express.Router();

router.get("/", protect, getDatas);
router.post("/", protect, addDatas);
router.get("/:id", protect, getData);
router.delete("/:id", protect, deleteData);

module.exports = router;
