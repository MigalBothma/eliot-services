const express = require('express');
const app = express();
const timeseries = require('./routes/timeseries');
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require("body-parser");

var queryString = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port + '/' + config.mongodb.database;

try{
    mongoose.connect(queryString, { useNewUrlParser: true }); 
}
catch(err){
    console.log('Error : Connection failed to : ' + queryString + ' with err : ', err);
}
finally{
    console.log('Connected to : ' + queryString);
}

app.use(bodyParser.json());
app.use(cors());
app.use('/timeseries', timeseries);

module.exports = app;
