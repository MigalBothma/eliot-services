var config = {};

config.debug = process.env.DEBUG || false;

config.mongodb = {};
config.mongodb.hostname   = process.env.MONGODB_HOSTNAME   || 'localhost' ;
config.mongodb.port       = process.env.MONGODB_PORT       || 27017;
config.mongodb.database   = process.env.MONGODB_DATABASE   || 'mqtt';
config.mongodb.collection = process.env.MONGODB_COLLECTION || 'events';

config.app = {};
config.app.port = process.env.PORT || 3000;

module.exports = config;
