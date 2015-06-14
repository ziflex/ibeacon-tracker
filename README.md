# iBeacon tracker

iBeacon tracker allows you to track any registered ibeacons and notify 3rd party services.

App is built on top of [bleno](https://github.com/sandeepmistry/bleno).

## Features
* tracks registered iBeacons
* notifies subscribers on events (`found`, `lost`)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node](http://nodejs.org/) (with NPM)
* [Babel](https://babeljs.io/)
* [Bluez](http://www.bluez.org/)
* [MongoDB](https://www.mongodb.org/downloads)
* [Forever](https://www.npmjs.com/package/forever)

### OS X

 * install [Xcode](https://itunes.apple.com/ca/app/xcode/id497799835?mt=12)

### Linux (Ubuntu)

 * Kernel version 3.6 or above
 * ```bluez```
 * ```bluez-utils```
 * ```libbluetooth-dev```
 * ```libcap2-bin```

## Installation

* `git clone <repository-url>` this repository
* `npm install && npm run build`
* run this command in bash `find -path '*noble*Release/hci-ble' -exec sudo setcap cap_net_raw+eip '{}' \;`
* run this command in bash `find -path '*bleno*Release/hci-ble' -exec sudo setcap cap_net_raw+eip '{}' \;`

## Running / Development

### Development
* `npm run start:dev`

### Production
* `npm run start`

## Configuring
* go to `htttp://localhost:8080` and log in using default credentials `admin:admin`.
* in `registry` section create new entry specifying `name`, `uuid`, `major` and `minor`.
* add subscribers which should be notified (**every subscriber should be specified as REST API method**).
* click `save`.

After registration app will start sending notifications when the ibeacon is found and/or lost. 

By default, subscriber recieves event name, uuid, major and minor numbers. 
If ``GET`` method is used, arguments are passed as query parameters in format ```?event={eventName}&uuid={uuid}&major={major}&minor={minor}```.
Otherwise they will be passed as form data.

Default behvaiour can be overridden.

## Further Reading / Useful Links

* [npm scripts](https://docs.npmjs.com/cli/run-script)
* [express](http://expressjs.com/)
* [mongoose](http://mongoosejs.com/)
* [bleno](https://github.com/sandeepmistry/bleno)
* [react](http://facebook.github.io/react/docs/getting-started.html)
* [react-router](http://rackt.github.io/react-router/)
* [alt](http://alt.js.org/docs/)
* [immutable](http://facebook.github.io/immutable-js/docs/)
