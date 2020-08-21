const express = require("express");
const router = express.Router();

const GatewaysController = require("../controllers/gateway");
const GatewaysMiddleware = require("../middleware/gateways");

router.get("/", GatewaysController.all);

router.post(
  "/",
  GatewaysMiddleware.validate("create"),
  GatewaysController.create
);

router.get("/:gatewayId", GatewaysController.get);

// TODO: Validate all fields when insert device
router.post("/:gatewayId", GatewaysController.add_device);

module.exports = router;
