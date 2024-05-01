const express = require("express");
const {
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  isValidated,
  updateUser,
  getUser
} = require("../controller/user");
const { validateCreateUserRequest } = require("../middlewares/user-middleware");
const router = express.Router();

router.post("/signup", validateCreateUserRequest, createUser);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotpwd", forgotPassword);
router.post("/reset-password/:token",resetPassword);
router.post("/validate",isValidated);
router.post("/update",updateUser);
router.get("/:id", getUser);

module.exports = router;
