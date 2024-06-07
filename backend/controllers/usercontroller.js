const User = require("../models/usermodel");
const generateJWTToken = require("../jwt/generateJWTtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");

const userRegister = async (req, res) => {
  try {
    const { fullName, email, password, avatar } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(200).json({
        message: "User already exists Please Login",
      });
    }

    const hashedPassword = await hashPassword(password);
    const userReg = new User({
      fullName,
      email,
      password: hashedPassword,
      avatar,
    });
    await userReg.save();

    res.status(201).json({
      _id: userReg._id,
      fullName: userReg.fullName,
      email: userReg.email,
      avatar: userReg.avatar,
      acesstoken: generateJWTToken(userReg.email),
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Please try again later.",
      error,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "Email is not registered",
      });
    }

    const matchpassword = await comparePassword(password, user.password);
    if (!matchpassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    res.status(200).json({
      message: "login successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
      },
      acesstoken: generateJWTToken(user.email),
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Please try again later.",
      error,
    });
  }
};

module.exports = { userRegister, userLogin };
