//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;
// const encrypt = require("mongoose-encryption");
// var md5 = require("md5");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// userSchema.plugin(encrypt, {
//   secret: process.env.SECRET,
//   encryptedFields: ["password"],
// });

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const newuser = new User({
      email: req.body.username,
      password: hash,
    });
    newuser.save(function (error) {
      if (error) {
        console.log(error);
      } else {
        res.render("secrets");
      }
    });
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ email: username }, function (error, docs) {
    if (error) {
      console.log(error);
    } else {
      if (docs) {
        bcrypt.compare(password, docs.password, function (err, result) {
          if (result === true) {
            res.render("secrets");
          }
        });
      }
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
