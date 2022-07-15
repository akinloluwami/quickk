require("dotenv").config();
const mysql = require("mysql2");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./src/schema/User");
const Post = require("./src/schema/Post");
const sequelize = require("./src/utils/db");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi, this is Quickk");
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log(err);
  });

const authRouter = require("./src/routes/authRoute");
const postRouter = require("./src/routes/postRoute");
const dashboardRouter = require("./src/routes/dashboardRoute");
const userRouter = require("./src/routes/userRoute");

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/dashboard", dashboardRouter);
app.use("/user", userRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
