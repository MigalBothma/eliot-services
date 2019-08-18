#!/bin/bash
echo "ELIoT Services Script"
echo "---------------------------------------------------------------------------"

echo "Changing directory to /usr/src/"
echo "---------------------------------------------------------------------------"
    cd /usr/src/
echo "---------------------------------------------------------------------------"

echo "Forever stop all services"
echo "---------------------------------------------------------------------------"
    forever stopall
echo "---------------------------------------------------------------------------"    

echo "Pulling ELIoT Services from github"
echo "---------------------------------------------------------------------------"
    git stash
    git pull https://github.com/MigalBothma/eliot-services.git
echo "---------------------------------------------------------------------------"

echo "NPM Install Service Dependencies"
echo "---------------------------------------------------------------------------"
    cd /usr/src/eliot-services/eliot-mqtt-mongodb/
    sudo npm install
    cd /usr/src/eliot-services/eliot-mongo-timeseries-api/
    sudo npm install
echo "---------------------------------------------------------------------------"

echo "Start ELIoT Services"
echo "---------------------------------------------------------------------------"
    forever start /usr/src/eliot-services/eliot-mqtt-mongodb/server.js
echo "eliot-mqtt-mongodb Started."
    forever start /usr/src/eliot-services/eliot-mongo-timeseries-api/server.js
echo "eliot-mongo-timeseries-api Started."
echo "---------------------------------------------------------------------------"

echo "Startup Logs"
echo "---------------------------------------------------------------------------"
    forever logs 0
echo "---------------------------------------------------------------------------"
    forever logs 1
echo "---------------------------------------------------------------------------"
echo "Done!"
