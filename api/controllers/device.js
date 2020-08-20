const mongoose = require("mongoose");
const Device = require("../models/device");

exports.delete = (req, res) => {
  Device.remove({ _id: req.params.deviceId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Device deleted",
        request: {
          type: "GET",
          url: "http://localhost:3000/gateways",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
