const express = require("express");
const { createStory } = require("../controllers/reviewController");

const router = express.Router();

router.post("/create", createStory);

module.exports = router;
