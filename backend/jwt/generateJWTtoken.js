const jwt = require("jsonwebtoken");

const generateJWTToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = generateJWTToken;
