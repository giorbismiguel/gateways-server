const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const gatewaysRoutes = require("./api/routes/gateways");

app.use("/gateways", gatewaysRoutes);

app.listen(3000);
