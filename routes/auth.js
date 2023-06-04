const express = require("express");
const authController = require("../controllers/auth");
const { check, body } = require("express-validator/");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({
          email: value,
        }).then((user) => {
          if (user) {
            throw new Error("Email exist already");
          }
        });
      }),
    body(
      "password",
      "Please enter a password with only numbers and text at least 5 characters"
    )
      .isLength({
        min: 5,
      })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
