const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

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
