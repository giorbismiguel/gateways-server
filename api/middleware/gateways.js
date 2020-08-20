const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create": {
      return [body("serial_number", "The Serial Number is required.").exists()];
    }
  }
};
