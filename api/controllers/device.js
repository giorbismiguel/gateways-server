const Device = require("../models/device");
const { isValidId } = require("../utils");
/**
 * Delete a device
 *
 * @param {*} req
 * @param {*} res
 */
exports.delete = (req, res) => {
  const { deviceId } = req.params;

  if (!isValidId(deviceId)) {
    return res.status(404).json({
      message: "Device not found",
    });
  }

  Device.findById(deviceId)
    .exec()
    .then((device) => {
      if (!device) {
        res.status(404).json({
          message: "Device not found",
        });
      }

      Device.findByIdAndRemove(deviceId)
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
    });
};
