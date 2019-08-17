var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const Event = require('../models/event');

router.get('/', async (req, res, next) => {
    const result = {
        "Functions" : {
            "GET /timeseries/" : "Returns this functions list",
            "GET /timeseries/all" : "Returns all timeseries entries (possbily limited)",
            "GET /timeseries/company/:companyName" : "Returns timeseries data for a specific company",
            "POST /timeseries/event" : "Post a timeseries entry to database/events (accepts JSON body)"
        }
    };
    res.send(result);
});

router.get('/all', async (req, res, next) => {
    const result = await Event.find();
    res.send(result);
});

router.get('/company/:company&?', async (req, res, next) => {
    const _company = req.params.company;
    const result = await Event.find({
        company: _company
    });
    res.send(result);
});

router.post('/event', async (req, res, next) => {
    const event = new Event({
        _id : new mongoose.Types.ObjectId(),
        timestamp: req.body.timestamp,
        company: req.body.company,
        location: req.body.location,
        area: req.body.area,
        topic: req.body.topic,
        message: req.body.message,
        data: req.body.data
    });
    event
        .save()
        .then( result => {
            console.log(result);
        })
        .catch( err => console.log(err));
    res.status(201).json({
        message : "Posting event to /timeseries",
        eventCreated : event
    })
});

module.exports = router;