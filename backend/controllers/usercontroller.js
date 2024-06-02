const User = require("../models/usermodel");
const generateJWTToken = require("../jwt/generateJWTtoken");

const userRegister = async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(409).json({ message: "User already exists" });
  }
  const userReg = new User(req.body);
  await userReg.save();

  if (userReg) {
    res.status(201).json({
      _id: userReg._id,
      fullName: userReg.fullName,
      email: userReg.email,
      avatar: userReg.avatar,
      acesstoken: generateJWTToken(userReg.email),
    });
  } else {
    res
      .status(400)
      .json({ message: "Something went wrong! Please try again later." });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
      acesstoken: generateJWTToken(user.email),
    });
  } else {
    res.status(400).json({ message: "Invalid Email or Password!" });
  }
};

module.exports = { userRegister, userLogin };
