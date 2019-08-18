#!/bin/bash
echo "ELIoT Services Script"

echo "Changing directory to /usr/src/"
cd /usr/src/

echo "Forever stop all services"
forever stopall

echo "Cloning ELIoT Services from github"
git clone https://github.com/MigalBothma/eliot-services.git

echo "NPM Install Service Dependencies"
cd eliot-mongo-timeseries-api
npm Install
cd ..
cd eliot-mqtt-mongodb
npm Install
cd ..

echo "Start ELIoT Services"
forever start /usr/src/eliot-services/eliot-mqtt-mongodb/server.js
echo "eliot-mqtt-mongodb Started."
forever start /usr/src/eliot-services/eliot-mongo-timeseries-api/server.js
echo "eliot-mongo-timeseries-api Started."

echo "Done!"
