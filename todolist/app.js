let express = require("express");
let app = express();
var _ = require("lodash");
const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect(
  "mongodb+srv://dexter:soumyajit@soumyajit.rz4cw.mongodb.net/todolistDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const date = require(__dirname + "/date.js");
app.use(express.static("public"));
// var items = ["Buy Food", "Eat Food", "Cook Food"];
// var workitems = [];

const itemsSchema = new Schema({
  name: String,
});

const listSchema = new Schema({
  name: String,
  items: [itemsSchema],
});
const List = mongoose.model("List", listSchema);

const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({ name: "Welcome to your todolist!" });
const item2 = new Item({ name: "Hit the + button to add a new item." });
const item3 = new Item({ name: "Hit this to delete an item." });

var defaultItems = [item1, item2, item3];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  // let day = date.getDate();
  Item.find({}, function (error, docs) {
    if (docs.length === 0) {
      Item.insertMany(defaultItems, function (error) {
        if (error) {
          console.log("Error!");
        } else {
          console.log("Data Saved!");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listtitle: "Today", newlistitem: docs });
    }
  });
});

app.get("/:custom", function (req, res) {
  const custom = _.capitalize(req.params.custom);
  List.findOne({ name: custom }, function (error, docs) {
    if (!error) {
      if (!docs) {
        const list = new List({
          name: custom,
          items: defaultItems,
        });
        list.save().then(() => console.log("Database Created!"));
        res.redirect("/" + custom);
      } else {
        res.render("list", { listtitle: docs.name, newlistitem: docs.items });
      }
    }
  });
});

app.post("/", (req, res) => {
  const itemname = req.body.newitem;
  const item = new Item({
    name: itemname,
  });

  if (req.body.list === "Today") {
    item.save().then(() => console.log("Database Created!"));
    res.redirect("/");
  } else {
    List.findOne({ name: req.body.list }, function (error, docs) {
      docs.items.push(item);
      docs.save().then(() => console.log("Database Created!"));
      res.redirect("/" + req.body.list);
    });
  }
  // if (req.body.list === "Work") {
  //   workitems.push(req.body.newitem);
  //   res.redirect("/work");
  // } else {
  //   items.push(req.body.newitem);
  //   res.redirect("/");
  // }
});

app.post("/delete", (req, res) => {
  if (req.body.listname === "Today") {
    Item.findByIdAndRemove(req.body.checkbox, function (error, docs) {
      if (!error) {
        console.log("Successfully deleted!");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: req.body.listname },
      { $pull: { items: { _id: req.body.checkbox } } },
      function (error, docs) {
        if (!error) {
          res.redirect("/" + req.body.listname);
        }
      }
    );
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listtitle: "Work list", newlistitem: workitems });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(4000, () => console.log("Example app listening on port 4000!"));
