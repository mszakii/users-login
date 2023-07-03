const express = require("express");
const app = express();
const mongo = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcrypt");

require("dotenv").config();

mongo
  .connect(process.env.URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Listing at http://localhost:3000");
    });
  })
  .catch(() => console.log("falied"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.post("/", async (req, res) => {
  User.findOne({
    mail: req.body.mail.toLowerCase(),
  })
    .then(async (result) => {
      if (pass) {
        if (result !== null) {
          res.render("home", { data: result });
        } else {
          res.status(406).render("err", { err: "Email is wrong" });
        }
      } else {
        res.status(406).render("err", { err: "Password is wrong" });
      }
    })
    .catch((err) => {
      res.status(406).render("err", {
        err: "Email or Password is wrong or you are not a user!",
      });
    });
});

app.get("/sign-up", (req, res) => {
  res.render("signup", { title: "Sign up" });
});

app.post("/sign-up", async (req, res) => {
  let salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.pass, salt);

  User.findOne({ mail: req.body.mail.toLowerCase() }).then((result) => {
    if (result == null) {
      const user = new User({
        name: req.body.name,
        mail: req.body.mail.toLowerCase(),
        pass: password,
      });

      user.save().then((result) => {
        res.render("home", { data: result });
      });
    } else {
      res.send("User is already exits");
    }
  });
});
