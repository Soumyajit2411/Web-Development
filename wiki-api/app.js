const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articleSchema = new Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

app
  .route("/articles")

  .get((req, res) => {
    Article.find({}, function (error, docs) {
      if (!error) {
        res.send(docs);
      } else {
        res.send(error);
      }
    });
  })

  .post((req, res) => {
    console.log(req.body.title);
    console.log(req.body.content);
    const newarticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newarticle.save(function (error, docs) {
      if (!error) {
        res.send("Succesfullly Added!");
      } else {
        res.send(error);
      }
    });
  })

  .delete((req, res) => {
    Article.deleteMany(function (error, docs) {
      if (!error) {
        res.send("Succesfullly Deleted!");
      } else {
        res.send(error);
      }
    });
  });

app
  .route("/articles/:articletitle")

  .get((req, res) => {
    Article.findOne({ title: req.params.articletitle }, function (error, docs) {
      if (!error) {
        res.send(docs);
      } else {
        res.send("No articles found");
      }
    });
  })
  .put((req, res) => {
    Article.updateOne(
      { title: req.params.articletitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      function (error, docs) {
        if (!error) {
          res.send("Succesfully Updated");
        }
      }
    );
  })
  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.articletitle },
      { $set: req.body },
      function (error, docs) {
        if (!error) {
          res.send("Succesfully Updated");
        } else {
          res.send(err);
        }
      }
    );
  })
  .delete((req, res) => {
    Article.deleteOne(
      { title: req.params.articletitle },
      function (error, docs) {
        if (!error) {
          res.send("Succesfullly Deleted!");
        } else {
          res.send(error);
        }
      }
    );
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
