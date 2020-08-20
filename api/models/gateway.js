const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gatewaySchema = Schema({
  serial_number: {
    type: String,
    require: true,
    unique: true,
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

Gateway = mongoose.model("Gateway", gatewaySchema);
module.exports = Gateway;

gatewaySchema.path("serial_number").validate(async (value) => {
  const serialNumberCount = await mongoose.models.Gateway.findOne({
    serial_number: value,
  });

  return !serialNumberCount;
}, `This Serial Number is already registered`);
