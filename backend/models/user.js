const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {nanoid}  = require("nanoid");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: validator.isEmail,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    required: true,
    default: "student",
  },
  password: {
    type: String,
    minLength: [8, "Password length should be at least 8"],
    required: [true, "Please provide password"],
    select: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  enrolledCoursesId: {
    type: Array,
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  } else {
    return next();
  }
});

userSchema.methods.isValidatePassword = async function (userPwd) {
  return await bcrypt.compare(userPwd, this.password);
};

userSchema.methods.getJWTToken = async function () {
  return await jwt.sign(
    { email: this.email, role: this.role, _id : this._id, firstName: this.firstName, lastName:this.lastName },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

userSchema.methods.getForgotToken = async function () {
  const uuid = nanoid();
  this.forgotPasswordToken = uuid;
  this.forgotPasswordExpiry = Date.now() + 30 * 60 * 1000;

  return uuid;
};

module.exports = mongoose.model("User", userSchema);
