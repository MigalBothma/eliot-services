var mongoose = require("mongoose");
// const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);

const contextSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateModified: {
        type: Date,
        default: Date.now
    },
    company: {
        type: String
    },
    locations: {
        type: Map,
        of: Object
    }
});

module.exports = mongoose.model("Context", contextSchema);
