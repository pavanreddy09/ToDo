const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: false,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: Object,
      required: false,
      default: {},
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // if (this.isModified("password")) {
  // }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
