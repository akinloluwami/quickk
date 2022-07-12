require("dotenv").config();
const mysql = require("mysql2");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./src/models/User");
const Post = require("./src/models/Post");
const sequelize = require("./src/utils/db");

app.use(bodyParser.json());
app.use(cors());

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log(err);
  });

const authRouter = require("./src/routes/authRoute");

app.use("/auth", authRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
