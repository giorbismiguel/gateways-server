const express = require("express");
const router = express.Router();

const GatewaysController = require("../controllers/gateway");

router.get("/", GatewaysController.all);

router.post("/", GatewaysController.create);

router.get("/:gatewayId", GatewaysController.get);

router.post("/:gatewayId", GatewaysController.add_device);

module.exports = router;
