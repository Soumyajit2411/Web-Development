let express = require("express");
let app = express();
const date = require(__dirname + "/date.js");
app.use(express.static("public"));
var items = ["Buy Food", "Eat Food", "Cook Food"];
var workitems = [];
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  let day = date.getDate();
  res.render("list", { listtitle: day, newlistitem: items });
});

app.post("/", (req, res) => {
  if (req.body.list === "Work") {
    workitems.push(req.body.newitem);
    res.redirect("/work");
  } else {
    items.push(req.body.newitem);
    res.redirect("/");
  }
});
app.get("/work", (req, res) => {
  res.render("list", { listtitle: "Work list", newlistitem: workitems });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(4000, () => console.log("Example app listening on port 4000!"));
