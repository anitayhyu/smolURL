const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  redirectUrl,
  getShortUrls,
  createAuthShortUrl
} = require("../controllers/urlController");
const { protect } = require("../middleware/authMiddleware");

router.post("/short", createShortUrl);
router.get("/:urlId", redirectUrl);
router.post("/authshort", protect, createAuthShortUrl);
router.get("/", protect, getShortUrls)

module.exports = router;
