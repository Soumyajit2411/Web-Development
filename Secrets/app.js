//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
require("dotenv").config();
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;
const passport = require("passport");
var session = require("express-session");
// const encrypt = require("mongoose-encryption");
// var md5 = require("md5");
// const bcrypt = require("bcrypt");

const saltRounds = 10;

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// userSchema.plugin(encrypt, {
//   secret: process.env.SECRET,
//   encryptedFields: ["password"],
// });
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
app.post("/register", (req, res) => {
  // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
  //   const newuser = new User({
  //     email: req.body.username,
  //     password: hash,
  //   });
  //   newuser.save(function (error) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       res.render("secrets");
  //     }
  //   });
  // });

  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    }
  );
});

app.post("/login", (req, res) => {
  // const username = req.body.username;
  // const password = req.body.password;
  // User.findOne({ email: username }, function (error, docs) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     if (docs) {
  //       bcrypt.compare(password, docs.password, function (err, result) {
  //         if (result === true) {
  //           res.render("secrets");
  //         }
  //       });
  //     }
  //   }
  // });

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (error) {
    if (error) {
      console.log(error);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
