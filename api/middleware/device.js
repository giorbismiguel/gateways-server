const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "delete": {
      return [body("deviceId", "The Id of Device is required.").exists()];
    }
  }
};
