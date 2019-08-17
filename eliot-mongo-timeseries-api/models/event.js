var mongoose = require("mongoose");
// const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);

const eventSchema = new mongoose.Schema({
  _id:{
    type: mongoose.Schema.Types.ObjectId
  },
  timestamp: {
    type: String
  },
  company: {
    type: String
  },
  location: {
    type: String
  },
  area: {
    type: String
  },
  topic: {
    type: String
  },
  message: {
    type: String
  },
  data: {
    type: Object
  }
});

module.exports = mongoose.model("Event", eventSchema);
