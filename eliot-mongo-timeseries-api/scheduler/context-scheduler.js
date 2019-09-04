const express = require("express");
const Event = require('../models/event');
const Context = require('../models/context');
var mongoose = require('mongoose');

module.exports = {
    startContextScheduler: async function () {
        console.log("cron scheduler running - " + Date.now.toString())

        let dbresult = await Event.find()

        //Get highest level of context
        let companies = [];
        let locations = [];
        let areas = [];

        //Get unique attributes
        let uniqueCompanies;
        let uniqueLocations;
        let uniqueAreas;

        //Store data in objects
        let contextdata = {};

        dbresult.forEach(event => {
            companies.push(event["company"]);
            locations.push(event["location"]);
            areas.push(event["area"]);
            event["data"]["timestamp"] = event["timestamp"];
        });

        //Get Distinct copmanies, locations & areas
        uniqueCompanies = Array.from(new Set(companies));
        uniqueLocations = Array.from(new Set(locations));
        uniqueAreas = Array.from(new Set(areas));

        uniqueCompanies.forEach(company => {
            dbresult.forEach(event => {
                if (event["company"] == company) {
                    if (contextdata[company] == undefined) { contextdata[company] = {}; }
                    uniqueLocations.forEach(location => {
                        if (event["location"] == location) {
                            if (contextdata[company][location] == undefined) { contextdata[company][location] = {}; }
                            uniqueAreas.forEach(area => {
                                if (event["area"] == area) {
                                    if (contextdata[company][location][area] == undefined) { contextdata[company][location][area] = {}; }
                                    let sensors = Object.keys(event["data"]);
                                    sensors.forEach( sensor => {
                                        if (contextdata[company][location][area][sensor] == undefined) { contextdata[company][location][area][sensor] = {}; }
                                    })
                                }
                            });
                        }
                    });
                }
            });
        });

        companies = Object.keys(contextdata);
        companies.forEach(async _company => {
            let dbResult = await Context.findOne({
                company: _company
            });

            //Create Context if no result is found for company
            if (dbResult == null) {
                let _locations;
                _locations = JSON.stringify(contextdata[_company]);
                _locations = _locations.replace("\\", "");
                _locations = JSON.parse(_locations);

                const context = new Context({
                    _id: new mongoose.Types.ObjectId(),
                    company: _company,
                    locations: _locations,
                    dateCreated: Date.now(),
                    dateModified: Date.now()
                });

                context
                    .save();
            }
        });
    }
}