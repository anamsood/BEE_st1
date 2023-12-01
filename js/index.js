const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs"); // to connect to MongoDB
const collection = require("./mongodb");

const templatePath = path.join(__dirname, "../templates");

app.use(express.json());
app.set("view engine", "hbs"); // defining that our view engine is hbs
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/signup", async (req, resp) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  await collection.insertMany([data]);

  resp.render("home");
});

app.post("/login", async (req, resp) => {
  try {
    const check = await collection.findOne({ name: req.body.name });

    if (check.password === req.body.password) {
      resp.render("home");
    } else {
      resp.send("wrong password");
    }
  } catch {
    resp.send("wrong details");
  }
});

app.listen(3000, () => {
  console.log("Server connected on port 3000");
});
