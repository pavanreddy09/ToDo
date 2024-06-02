const express = require("express");
const { userRegister, userLogin } = require("../controllers/usercontroller");
const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);

module.exports = router;
