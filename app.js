const express = require("express");
const app = express();
const path = require("path");

const morgan = require("morgan");

app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname, "public")));





module.exports = app;
