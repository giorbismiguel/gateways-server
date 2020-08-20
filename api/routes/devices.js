const express = require("express");
const router = express.Router();

const DevicesController = require("../controllers/device");

router.delete("/:deviceId", DevicesController.delete);

module.exports = router;
