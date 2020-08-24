const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create": {
      return [
        body("name", "The Name is required.").exists().isEmpty().trim(),
        body("name", "The Name may not at least 2.").isLength({
          min: 2,
        }),
        body("name", "The Name may not be greater than 50.").isLength({
          max: 50,
        }),        
        body("serial_number", "The Serial Number is required.").exists().trim(),
        body("serial_number", "The Serial Number may not at least 2.").isLength(
          {
            min: 2,
          }
        ),
        body(
          "serial_number",
          "The Serial Number may not be greater than 50."
        ).isLength({
          max: 50,
        }),
        body("ip", "The IP is required.").exists().isEmpty().trim(),
        body("ip", "The IP is not valid IPv4 address.").isIP(),
      ];
    }

    case "add_device": {
      return [
        body("vendor", "The Vendor is required.").exists().isEmpty().trim(),
        body("vendor", "The Vendor may not at least 2.").isLength({
          min: 2,
        }),
        body("vendor", "The Vendor may not be greater than 200.").isLength({
          max: 200,
        }),
        body("status", "The Status is required.").exists(),
        body("status", "The Status is required.").isBoolean(),
      ];
    }
  }
};
