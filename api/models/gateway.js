const mongoose = require("mongoose");
let Schema = mongoose.Schema

const gatewaySchema = mongoose.Schema({
  serial_number: {
    type: String,
    require: true,
  },

  name: {
    type: String,
    require: true,
  },

  ipv4: {
    type: String,
    require: true,
  },

  devices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
  ],
});

module.exports = mongoose.model("Gateway", gatewaySchema);
