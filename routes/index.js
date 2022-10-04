/*
  Student name: Dênio Barbosa Júnior
  Student ID: 301165098
  Class: COMP229 - Web Application Development
  
*/
var express = require("express");
const Assignment1 = require("../model/assigment1.model");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home", { title: "COMP 229 - Assignment 1 - Home Page" });
});

/* GET about_me page. */
router.get("/about", function (req, res, next) {
  res.render("about_me", { title: "COMP 229 - Assignment 1 - About Me" });
});

/* GET projects page. */
router.get("/projects", function (req, res, next) {
  res.render("projects", { title: "COMP 229 - Assignment 1 - Projects" });
});

/* GET about_me page. */
router.get("/services", function (req, res, next) {
  res.render("services", { title: "COMP 229 - Assignment 1 - Services" });
});

/* GET about_me page. */
router.get("/contact", function (req, res, next) {
  res.render("contact", {
    title: "COMP 229 - Assignment 1 - Contact Information",
  });
});

/* POST for the Contact page*/
router.post("/contact/info", async function (req, res, next) {
  //console.log(req.body);
  const contact_information = new Assignment1({
    first_name: req.body.txtFirstName,
    last_name: req.body.txtLastName,
    phone: req.body.txtPhone,
    email: req.body.txtEmail,
    contact_input: req.body.txtSpecialRq,
  });

  await contact_information.save();

  res.redirect("/");
});

module.exports = router;