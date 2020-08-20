
const { validationResult } = require("express-validator");

const Gateway = require("../models/gateway");
const Device = require("../models/device");

/**
 * Displaying information about all stored gateways
 *
 * @param {*} req
 * @param {*} res
 */
exports.all = (req, res) => {
  Gateway.find({})
    .exec()
    .then((gateways) => {
      res.status(201).json({
        count: gateways.length,
        orders: gateways.map((gateway) => {
          return {
            _id: gateway._id,
            serial_number: gateway.serial_number,
            name: gateway.name,
            ipv4: gateway.ipv4,
            devices: gateway.devices,
            request: {
              type: "GET",
              url: "http://localhost:3000/gateway/" + gateway._id,
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

// TODO: IPv4 must be validated and an error returned if it is invalid.

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
  Gateway.findById(req.params.gatewayId).populate().exec();
  then((gateway) => {
    if (!gateway) {
      return res.status.length(404).json({
        message: "Gateway not found",
      });
    }

    res.status(200).json({
      message: "Gateway was return",
      gateway,
    });
  });
};

// TODO: Do not allow more than 10 peripheral devices
/**
 * Add device to gateways
 *
 * @param {*} req
 * @param {*} res
 */
exports.add_device = (req, res) => {
  const device = new Device({
    uid: req.body.uid,
    vendor: req.body.vendor,
    created: req.body.created,
    status: req.body.status,
  });

  return device
    .save()
    .then((dbDevice) => {
      gateway.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { devices: dbDevice._id } },
        { new: true }
      );

      res.status(201).json({
        message: `Device added to Gateway: ${$gateway.serial_number}`,
        createdGateway: {
          _id: dbDevice._id,
          name: dbDevice.name,
          ip: dbDevice.ipv4,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};
