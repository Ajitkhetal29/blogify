const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser'); 
const { checkForAuthentication } = require("./middlewares/authentication");

mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then((e) => console.log("MongoDB Connecetd"));

const PORT = 8000;

const app = express();

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());
app.use(checkForAuthentication("token"));


app.get("/", (req, res) => {
  res.render("home",{
    user : req.user
  });
});

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`The server is running on the ${PORT}`));
