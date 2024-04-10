const express = require("express");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
require("dotenv").config();

const { authRouter } = require("./routes/auth.router");
const { blogRouter } = require("./routes/blog.router");

const uri = process.env.MONGO_URL;

const app = express();

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(cookieSession({ signed: false, domain: ".localhost" }));

app.use("/auth", authRouter);
app.use("/blog", blogRouter);

async function start() {
  console.log("connecting..");
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongodb");
  } catch (err) {
    console.log("Error connecting to mongo db", err);
  }

  app.listen(4000, () => {
    console.log("listening on port 4000");
  });
}

start();
