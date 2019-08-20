var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const Event = require('../models/event');

router.get('/', async (req, res, next) => {
    const result = {
        "Functions" : {
            "GET /timeseries/" : "Returns this functions list",
            "GET /timeseries/all" : "Returns all timeseries entries (limited to 1440 events = 1 day)",
            "GET /timeseries/company/:companyName" : "Returns timeseries data for a specific company",
            "GET /timeseries/company/:company/location/:location" : "Returns all timeseries entries for Company + Location",
            "GET /timeseries/company/:company/location/:location/area/:area" : "Returns all timeseries entries for Company + Location + Area",
            "POST /timeseries/event" : "Post a timeseries entry to database/events (accepts JSON body)"
        }
    };
    res.send(result);
});

router.get('/all', async (req, res, next) => {
    const result = await Event.find();
    res.send(result);
});

router.get('/company/:company', async (req, res, next) => {
    const _company = req.params.company;
    const result = await Event.find({
        company: _company
    });
    res.send(result);
});

router.get('/company/:company/location/:location', async (req, res, next) => {
    const _company = req.params.company;
    const _location = req.params.location;
    const result = await Event.find({
        company: _company,
        location : _location
    });
    res.send(result);
});

router.get('/company/:company/location/:location/area/:area', async (req, res, next) => {
    const _company = req.params.company;
    const _location = req.params.location;
    const _area = req.params.area;
    const result = await Event.find({
        company: _company,
        location : _location,
        area : _area
    });
    res.send(result);
});

router.get('/company/:company/timeseries', async (req, res, next) => {
    const _company = req.params.company;
    const dbresult = await Event.find({
        company: _company
    });

    var result = {};

    var locations = [];
    var areas = [];

    var uniqueLocations;
    var uniqueAreas;

    //limit to 1440 results @ 1 min = 1 day
    if(dbresult.length > 0)
    {
        if(dbresult.length > 1440){
            dbresult = dbresult.slice(0, 1399);
        }
    }

    dbresult.forEach(event => {
        locations.push(event["location"]);
        areas.push(event["area"]);
    });

    //Get Distinct locations & areas
    uniqueLocations = Array.from(new Set(locations));
    uniqueAreas = Array.from(new Set(areas));

    uniqueLocations.forEach( location => {
        
    });

    console.log(uniqueLocations);

    res.send(result);
})

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