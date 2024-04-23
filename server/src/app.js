const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");

const { userRouter } = require("./routers/userRouter");
const { seedRouter } = require("./routers/seedRouter");
const { errorResponse } = require("./controllers/responseController");

const app = express();

const rateLimiter = rateLimit({
  // user can set 5 req within a min
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: "Too many requests from this api. Please try again later",
});

app.use(morgan("dev"));
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

// client err handling middleware
app.use((req, res, next) => {
  //   createError(401, "Route not found");
  //   next();
  next(createError(401, "Route not found"));
});

// server err handling middleware (all the errs)
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
