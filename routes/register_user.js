var express = require("express");
const User = require("../model/registered.model");
var router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/", function (req, res, next) {
  res.render("register_user", {
    title: "COMP 229 - Assignment 1 - Register User",
  });
});

/* POST for the User Register page*/
router.post("/info", [
  body("username")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Username should have 4 to 20 characters")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Password should have 3 to 20 characters")
    .escape(),
  body("email", "Email is invalid").isEmail().normalizeEmail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("register_user", {
        user: req.body,
        errors: errors.array(),
        title: "COMP 229 - Assignment 1 - Register Fail",
      });
      return;
    }
    const { username, password, email } = req.body;
    new User({
      username,
      password,
      email,
    }).save((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  },
]);

module.exports = router;
