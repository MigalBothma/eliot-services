var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
const Context = require('../models/context');

router.get('/:company', async (req, res, next) => {
    const _company = req.params.company;
    const result = await Context.find({
        company : _company
    });
    res.send(result);
});

router.post('/model', async (req, res, next) => {
    const context = new Context({
        _id: new mongoose.Types.ObjectId(),
        dateCreated: req.body.dateCreated,
        dateModified: req.body.dateModified,
        company: req.body.company,
        locations: req.body.locations
    });

    context
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
        res.status(201).json({
        message: "Posting model to /context",
        eventCreated: context
    })
});

module.exports = router;