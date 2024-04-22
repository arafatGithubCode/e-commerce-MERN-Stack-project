const express = require("express");

const app = express();

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
