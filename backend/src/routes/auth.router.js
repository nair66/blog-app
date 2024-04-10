const express = require("express");
const User = require("../models/User.model");
const { comparePassword } = require("../utils/password");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  const userJwt = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    "random"
  );
  req.session.jwt = userJwt;
  res.send("success");
});

router.post("/signout", async (req, res) => {
  req.session = null;
  res.send({});
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  console.log("received email password", email, password);
  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    return res.status(200).send("Authentication failed");
  }

  const compareResult = await comparePassword(user.password, password);
  if (!compareResult) {
    return res.send("Authentication failed");
  }

  const userJwt = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    "random"
  );

  req.session.jwt = userJwt;
  res.status(200).send("success");
});

module.exports = {
  authRouter: router,
};
