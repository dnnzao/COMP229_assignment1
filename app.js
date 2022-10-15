/*
  Student name: Dênio Barbosa Júnior
  Student ID: 301165098
  Class: COMP229 - Web Application Development
  
*/
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
const User = require("./model/registered.model");
const session = require("express-session");
var app = express();

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        next(err);
        return;
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password === password) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(
  session({
    secret: "oi",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

var indexRouter = require("./routes/index");
app.use("/", indexRouter);

var registerUser = require("./routes/register_user");
app.use("/register_user", registerUser);

// cookie parser middleware
var cookieParser = require("cookie-parser");
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://dbarbosajr:iWScfNCuJtdh0duu@cluster0.i8lyxld.mongodb.net/?retryWrites=true&w=majority"
);

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

/*
var db1 = mongoose.createConnection(<LinkToDatabase></LinkToDatabase>);
var db2 = mongoose.createConnection(<LinkToDatabase></LinkToDatabase>);
*/