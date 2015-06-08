# iBeacon tracker

iBeacon tracker allows you to track any registered ibeacons and notify 3rd party services.

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
 * ```libbluetooth-dev```
 * ```libcap2-bin```

## Installation

* install `bluez` [how-to](http://www.jaredwolff.com/blog/get-started-with-bluetooth-low-energy/)
* install `MongoDb` [how-to](http://docs.mongodb.org/manual/administration/install-on-linux/)
* `git clone <repository-url>` this repository
* `npm install && npm run build`
* run this command in bash `find -path '\*noble*Release/hci-ble\' -exec sudo setcap cap_net_raw+eip '\{}\' \;`
* run this command in bash `find -path '*bleno*Release/hci-ble' -exec sudo setcap cap_net_raw+eip '{}' \;`

## Running / Development

### Development
* `npm run start:dev`

### Production
* `npm run start`

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [npm scripts](https://docs.npmjs.com/cli/run-script)
* [express](http://expressjs.com/)
* [mongoose](http://mongoosejs.com/)
* [bleno](https://github.com/sandeepmistry/bleno)
* [react](http://facebook.github.io/react/docs/getting-started.html)
* [react-router](http://rackt.github.io/react-router/)
* [alt](http://alt.js.org/docs/)
* [immutable](http://facebook.github.io/immutable-js/docs/)
