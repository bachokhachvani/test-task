const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const initializeData = require("./config/initializeData");

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

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
const router = require("./routes/dogRouter");
app.use("/", router);

//error handler middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
  });
});

//testing
app.get("/ping", (req, res) => {
  res.json({ message: "Dogshouseservice.Version1.0.1" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
