const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  deviceID:{
    type: String,

  }
});

module.exports = City = mongoose.model("City", CitySchema);
