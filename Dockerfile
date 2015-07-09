FROM node:0.12.4
MAINTAINER Tim Voronov <ziflex@gmail.com>

# Installation
RUN apt-get update && apt-get install -y apt-utils libbluetooth-dev libcap2-bin bluez mongodb
RUN npm install -g strong-pm && sl-pm-install

# Create the MongoDB data directory and run MongoDB
RUN mkdir -p /data/db && chown -R mongodb:mongodb /data/db

# Cloning project
RUN git clone https://github.com/ziflex/ibeacon-tracker.git
WORKDIR "/ibeacon-tracker"

# Installing dependencies
RUN npm install
RUN find -path '*bleno*Release/hci-ble' -exec sudo setcap cap_net_raw+eip '{}' \;
RUN find -path '*noble*Release/hci-ble' -exec sudo setcap cap_net_raw+eip '{}' \;

# Build
RUN npm run build

# Expose port
EXPOSE 8080

# Run command
CMD mongod & slc start --cluster="off"
