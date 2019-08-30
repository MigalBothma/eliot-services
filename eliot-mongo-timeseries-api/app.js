//Application extensions
const express = require('express');
const cors = require('cors');
var bodyParser = require("body-parser");

//Mongoose
const mongoose = require('mongoose');

//Routes
const timeseries = require('./routes/timeseries');

//Swagger Docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//MongoDB Connection String
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

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/timeseries', timeseries);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
