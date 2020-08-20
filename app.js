const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});
app.use(morgan("dev"));

const gatewaysRoutes = require("./api/routes/gateways");
const devicesRoutes = require("./api/routes/devices");
app.use("/gateways", gatewaysRoutes);
app.use("/devices", devicesRoutes);

try {
  if (process.env.LOCAL_ENV) {
    mongoose.connect("mongodb://localhost:27017/gateways", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else {
    mongoose.connect(
      "mongodb+srv://giorbismiguel:" +
        process.env.MONGO_ATLAS_PW +
        "@cluster0-drksp.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
} catch (error) {
  console.log(error);
}

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(3000);
