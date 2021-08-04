require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const nodeEnv = process.env.NODE_ENV;
const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/image", require("./routes/image"));

app.listen(port, console.log(`express app running on port:${port}`));

mongoose.connect(
  mongoUri,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  console.log("mongodb connected")
);
