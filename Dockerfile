FROM node:0.12.4
MAINTAINER Tim Voronov <ziflex@gmail.com>
RUN apt-get update && apt-get install -y apt-utils libbluetooth-dev libcap2-bin bluez mongodb
RUN npm install -g forever
RUN git clone https://github.com/ziflex/ibeacon-tracker.git
WORKDIR "/ibeacon-tracker"
RUN npm install
RUN find -path '\*noble*Release/hci-ble\' -exec sudo setcap cap_net_raw+eip '\{}\' \;
RUN find -path '*bleno*Release/hci-ble' -exec sudo setcap cap_net_raw+eip '{}' \;
RUN npm run build
EXPOSE 8080
CMD ["npm", "run start"]