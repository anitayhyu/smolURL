const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// signup user
// POST api/users
const signupUser = asyncHandler(async (req, res) => {
 const { name, email, password } = req.body;
 if (!name || !email || !password) {
   res.status(400);
   throw new Error("Please enter all fields");
 }
 //check if user exists
 const userExists = await User.findOne({ email });
 if (userExists) {
   res.status(400);
   throw new Error("User already exists");
 }
 //hash password
 const salt = await bcrypt.genSalt(12);
 const hashedPwd = await bcrypt.hash(password, salt);
 //create the user
 const user = await User.create({
   name,
   email,
   password: hashedPwd
 });
 //create token
 const token = createToken(user._id);
 user.token = token;
 await user.save();

 if (user) {
   res.status(201).json({
     _id: user.id,
     name: user.name,
     email: user.email,
     token: token
   });
 } else {
   res.status(400);
   throw new Error("Invalid user data, please try again");
 }
});

// authenticate user
// POST api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: createToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credentials, please try again");
  }
});

// get user data
// GET api/users/mydata
const getMyData = asyncHandler(async (req, res) => {
res.status(200).json(req.user)
});


module.exports = {
  signupUser,
  loginUser,
  getMyData,
};
