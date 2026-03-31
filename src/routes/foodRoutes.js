const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const authenticateToken = require("../middleware/auth");
const {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
} = require("../controllers/foodController");

const router = express.Router();

router.use(authenticateToken);

router.get("/", asyncHandler(getFoods));
router.get("/:id", asyncHandler(getFoodById));
router.post("/", asyncHandler(createFood));
router.put("/:id", asyncHandler(updateFood));
router.delete("/:id", asyncHandler(deleteFood));

module.exports = router;
