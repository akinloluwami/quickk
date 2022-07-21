require("dotenv").config();
const mysql = require("mysql2");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./src/schema/User");
const Post = require("./src/schema/Post");
const sequelize = require("./src/utils/db");
const fileupload = require("express-fileupload");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.get("/", (req, res) => {
  res.send("Quickk, server is running");
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
const paymentRouter = require("./src/routes/paymentRoute");

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/dashboard", dashboardRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
