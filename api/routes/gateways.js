const express = require("express");
const router = express.Router();

const GatewaysController = require("../controllers/gateway");
const GatewaysMiddleware = require("../middleware/gateways");

router.get("/", GatewaysController.all);

router.get("/:gatewayId", GatewaysController.get);

router.post(
  "/:gatewayId",
  GatewaysMiddleware.validate("add_device"),
  GatewaysController.add_device
);

router.post(
  "/",
  GatewaysMiddleware.validate("create"),
  GatewaysController.create
);

module.exports = router;
