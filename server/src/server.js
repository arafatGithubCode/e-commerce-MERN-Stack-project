const express = require("express");

const morgan = require("morgan");

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

app.get("/api/user", isLoggedIn, (req, res) => {
  console.log(req.body.id);
  res.status(200).send({
    message: "User profile is returned!",
  });
});

app.listen(3001, () => {
  console.log("server is running at http://localhost:3001");
});
