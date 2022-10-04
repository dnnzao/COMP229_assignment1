/*
  Student name: Dênio Barbosa Júnior
  Student ID: 301165098
  Class: COMP229 - Web Application Development
  
*/
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(
  "mongodb+srv://dbarbosajr:iWScfNCuJtdh0duu@cluster0.i8lyxld.mongodb.net/?retryWrites=true&w=majority"
);

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

var port = process.env.PORT || 3000;
app.listen(port);
