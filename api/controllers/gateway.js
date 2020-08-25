const { validationResult } = require("express-validator");
const { isValidId } = require("../utils");
const Gateway = require("../models/gateway");
const Device = require("../models/device");

/**
 * Displaying information about all stored gateways
 *
 * @param {*} req
 * @param {*} res
 */
exports.all = (req, res) => {
  50;
  Gateway.find({})
    .populate("devices")
    .exec()
    .then((gateways) => {
      res.status(201).json({
        count: gateways.length,
        gateways: gateways.map((gateway) => {
          return {
            _id: gateway._id,
            serial_number: gateway.serial_number,
            name: gateway.name,
            ipv4: gateway.ipv4,
            devices: gateway.devices,
            request: {
              type: "GET",
              url: "http://localhost:" + process.env.PORT + "/gateway/" + gateway._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

/**
 * Create a gateway
 *
 * @param {*} req
 * @param {*} res
 */
exports.create = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });

    return;
  }

  const { serial_number, name, ip, status } = req.body;

  const gateway = new Gateway({
    serial_number: serial_number,
    name: name,
    ipv4: ip,
    status: status,
  });

  return gateway
    .save()
    .then((dbGateway) => {
      res.status(201).json({
        message: "Gateway stored",
        createdGateway: {
          _id: dbGateway._id,
          name: dbGateway.name,
          ip: dbGateway.ipv4,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

/**
 * Get a single gateway
 *
 * @param {*} req
 * @param {*} res
 */
exports.get = (req, res) => {
  const { gatewayId } = req.params;

  if (!isValidId(gatewayId)) {
    return res.status(404).json({
      message: "Gateway not found",
    });
  }

  return Gateway.findById(gatewayId)
    .populate("devices")
    .exec()
    .then((gateway) => {
      if (!gateway) {
        res.status(404).json({
          message: "Gateway not found",
        });
      }

      res.status(200).json({
        message: "Gateway returned",
        gateway,
      });
    });
};

/**
 * Add device to gateways
 *
 * @param {*} req
 * @param {*} res
 */
exports.add_device = (req, res) => {
  const { gatewayId } = req.params;

  if (!isValidId(gatewayId)) {
    return res.status(404).json({
      message: "Gateway not found",
    });
  }
  
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });

    return;
  }

  Gateway.findById(gatewayId)
    .populate("devices")
    .exec()
    .then((dbGateway) => {
      if (!dbGateway) {
        return res.status(404).json({
          message: "Gateway not found",
        });
      }

      if (dbGateway.devices.length >= 10) {
        return res.status(422).json({
          message:
            "No more that 10 peripheral devices are allowed for a gateway.",
        });
      }

      const device = new Device({
        uid: ++dbGateway.devices.length,
        vendor: req.body.vendor,
        created: req.body.created,
        status: req.body.status,
      });

      return device
        .save()
        .then((dbDevice) => {
          Gateway.findByIdAndUpdate(
            gatewayId,
            { $push: { devices: dbDevice._id } },
            { new: true, useFindAndModify: false }
          ).then((dbGateway) => {
            res.status(201).json({
              message: `Device added to Gateway: ${dbGateway.name}`,
              device: dbDevice,
            });
          });
        })
        .catch((err) => {
          res.status(500).json({
            err: err,
          });
        });
    });
};
