const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const initializeData = require("./config/initializeData");
const timeout = require("connect-timeout");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

sequelize
  .sync({ force: false })
  .then((result) => console.log("database is syncronised!"))
  .then(() => {
    initializeData()
      .then(() => {
        console.log("data initialization is completed!");
      })
      .catch((e) => console.log("Error message: ", e));
  })
  .catch((e) => {
    console.log("Error: ", e);
  });

const TIMEOUT = "3s";

//middlewares
app.use(timeout(TIMEOUT));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
const router = require("./routes/dogRouter");
app.use("/", router);

//testing request timeout error

// app.get("/long-request", (req, res, next) => {
//   setTimeout(() => {
//     res.send("Long request completed");
//   }, 50000 + 1000); // Timeout duration + additional time to exceed the timeout
// });

//error handler middleware
app.use(errorMiddleware);

//testing
app.get("/ping", (req, res) => {
  res.json({ message: "Dogshouseservice.Version1.0.1" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
