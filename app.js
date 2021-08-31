const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI, () => {
  console.log("DATABASE CONNECTED");
});

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
