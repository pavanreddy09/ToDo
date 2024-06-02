const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const verifyJWTToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
        if (err) {
          return "token_expired";
        } else {
          return res;
        }
      });

      if (decoded === "token_expired") {
        return res.status(400).json({ message: "Token expired login again" });
      }
      req.user = await User.findOne({ email: decoded.email }).select(
        "-password"
      );

      next();
    } catch (err) {
      res.status(400).json({ message: "Not logged in or invalid token" });
    }
  }

  if (!token) {
    return res.status(400).json({ message: "Not authorized or Invalid Token" });
  }
};

module.exports = { verifyJWTToken };
