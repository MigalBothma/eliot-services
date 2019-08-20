var mongodb = require('mongodb');
var mqtt = require('mqtt');
var config = require('./config');
var moment = require('moment');

//Setup MQTT
var mqttUri = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var client = mqtt.connect(mqttUri);

//Setup and connect to MongoDB
var mongoUri = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port + '/' + config.mongodb.database;
mongodb.MongoClient.connect(mongoUri, setupCollection);

function setupCollection(err, database) {
	if (err) throw err;

	collection = database.collection(config.mongodb.collection);
	client.subscribe(config.mqtt.namespace);
	client.on('message', insertEvent);
}

function insertEvent(topic, message) {
	if (topic && message) {
		console.log("Time : " + moment().toISOString() + ", Topic : " + topic);
		var messageObject = {};;
		var _topicdata = topic.split("/");

		var _company = _topicdata[0];
		var _location = _topicdata[1];
		var _area = _topicdata[2];

		messageObject = {
			timestamp: moment().toISOString(),
			company: _company,
			location: _location,
			area: _area,
			data: JSON.parse(message)
		};

		//Insert object into DB
		collection.insert(messageObject, function (error, result) {
			if (error != null) {
				console.log("ERROR: " + error);
			}
			console.log("MongoDB result : " + result);
		});
		}
	}
}
