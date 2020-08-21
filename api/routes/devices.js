const express = require("express");
const router = express.Router();

const MiddlewareController = require("../middleware/device");
const DevicesController = require("../controllers/device");

router.delete(
  "/:deviceId",
  MiddlewareController.validate("delete"),
  DevicesController.delete
);

module.exports = router;
