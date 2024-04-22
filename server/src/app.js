const express = require("express");

const morgan = require("morgan");

const createError = require("http-errors");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isLoggedIn = (req, res, next) => {
  const login = true;
  if (login) {
    console.log("login success");
    req.body.id = 101;
    next();
  } else {
    return res.status(401).json({ message: "please login first" });
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

app.get("/api/users", isLoggedIn, (req, res) => {
  console.log(req.body.id);
  res.status(200).send({
    message: "User profile is returned!",
  });
});

// client err handling middleware
app.use((req, res, next) => {
  //   createError(401, "Route not found");
  //   next();
  next(createError(401, "Route not found"));
});

// server err handling middleware (all the errs)
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
