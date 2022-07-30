require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./src/utils/db");
const fileupload = require("express-fileupload");

app.use(cors());
app.options("*", cors());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileupload({
    useTempFiles: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
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
