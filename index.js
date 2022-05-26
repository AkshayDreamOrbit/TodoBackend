const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const PORT = 3000;
require("./src/database/connection");

app.use(bodyparser.json());
app.use(cors());
app.options("*",cors());

//app.use("/static", express.static("public"));
//app.use(express.urlencoded({ extended: true }));
//app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //res.render("todo.ejs");
});

const toDo = require("./src/routes/todo.route");
app.use("/api/todo", toDo);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
