const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "List of Gateways and their devices",
  });
});

router.get("/:id", (req, res, next) => {
  return res.status(200).json({
    message: "Display details for a single gateway",
  });
});

module.exports = router;
