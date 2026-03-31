const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { processWorkload } = require("../controllers/processController");

const router = express.Router();

router.post("/", asyncHandler(processWorkload));

module.exports = router;
