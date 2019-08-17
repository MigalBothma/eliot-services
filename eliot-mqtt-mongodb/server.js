var mongodb  = require('mongodb');
var mqtt     = require('mqtt');
var config   = require('./config');
var moment = require('moment');

var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var client   = mqtt.connect(mqttUri);

client.on('connect', function () {
    client.subscribe(config.mqtt.namespace);
});

var mongoUri = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port + '/' + config.mongodb.database;
mongodb.MongoClient.connect(mongoUri, function(error, database) {
    if(error != null) {
        throw error;
    }

    var collection = database.collection(config.mongodb.collection);
    collection.createIndex( { "topic" : 1 } );

    client.on('message', function (topic, message) {
            console.log("Message : " + message + " from Topic : " + topic);
            var messageObject = {};
	    var _topicdata = topic.split("/");

	    if(_topicdata.length == 3){
	        var _company = _topicdata[0];
                var _location = _topicdata[1];
                var _area = _topicdata[2];

		messageObject = {
            	timestamp : moment().format('YYYY-MM-DD hh:mm:ss'),
	    	company : _company,
	    	location : _location,
	    	area : _area,
	    	topic: topic,
            	message: message.toString(),
	    	data: JSON.parse(message)};
	    }

	    else{
		messageObject = {
            	timestamp : moment().format('YYYY-MM-DD hh:mm:ss'),
            	topic: topic,
            	message: message.toString(),
             	data: JSON.parse(message)};
	    }

        collection.insert(messageObject, function(error, result) {
            if(error != null) {
                console.log("ERROR: " + error);
            }
        });
    });
});
