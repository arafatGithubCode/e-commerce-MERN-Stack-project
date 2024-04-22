const express = require("express");

const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

app.get("/products", (req, res) => {
  res.status(200).send({
    message: "all products are returned",
  });
});

app.listen(3001, () => {
  console.log("server is running at http://localhost:3001");
});
