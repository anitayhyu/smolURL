const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getMyData,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", signupUser);
router.post("/login", loginUser);
router.get("/mydata", protect, getMyData);

module.exports = router;
