#!/bin/bash
echo "ELIoT Services Script"

echo "Changing directory to /usr/src/"
cd /usr/src/

echo "Forever stop all services"
forever stopall

echo "Pulling ELIoT Services from github"
git stash
git pull https://github.com/MigalBothma/eliot-services.git

echo "NPM Install Service Dependencies"
cd /usr/src/eliot-services/eliot-mqtt-mongodb/
sudo npm install
cd /usr/src/eliot-services/eliot-mongo-timeseries-api/
sudo npm install

echo "Start ELIoT Services"
forever start /usr/src/eliot-services/eliot-mqtt-mongodb/server.js
echo "eliot-mqtt-mongodb Started."
forever start /usr/src/eliot-services/eliot-mongo-timeseries-api/server.js
echo "eliot-mongo-timeseries-api Started."

echo "Done!"
