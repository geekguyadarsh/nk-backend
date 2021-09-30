const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

// Middewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

// DB CONNCECTION AND STAERTING THE SERVER

const port = process.env.PORT || 5000;
const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI, () => {
  console.log("DATABASE CONNECTED");
});

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
