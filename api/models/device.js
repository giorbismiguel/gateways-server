const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
  uid: {
    type: Number,
    require: true,
  },

  vendor: {
    type: String,
    require: true,
  },

  created: {
    type: Date,
    require: true,
    default: Date.now,
  },

  status: {
    type: Boolean,
    default: "false",
  },
});

module.exports = mongoose.model("Device", deviceSchema);
