const express = require("express");

const router = express.Router();

router.post("/", (req, res, next) => {
  return res.status(200).json({
    message: "The device was added",
  });
});

router.delete("/:id", (req, res, next) => {
  return res.status(200).json({
    message: "The devices was deleted",
  });
});

module.exports = router;
