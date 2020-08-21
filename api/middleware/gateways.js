const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create": {
      return [
        body("serial_number", "The Serial Number is required.").exists(),
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

        body("name", "The Name is required.").exists(),
        body("name", "The Name may not at least 2.").isLength({
          min: 2,
        }),
        body("name", "The Name may not be greater than 50.").isLength({
          max: 50,
        }),

        body("ip", "The IP is required.").exists(),
        body("ip", "The IP is not valid IPv4 address.").isIP(),
      ];
    }
  }
};
