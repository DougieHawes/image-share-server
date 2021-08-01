require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT;

const app = express();

app.use(cors());

app.listen(port, console.log(`express app running on port:${port}`));

mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("mongodb connected")
);
