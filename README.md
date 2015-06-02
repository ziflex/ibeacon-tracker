# Foosbal-room

A short introduction of this app.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node](http://nodejs.org/) (with NPM)
* [Babel](https://babeljs.io/)
* [Forever](https://www.npmjs.com/package/forever)
* [Bluez](http://www.bluez.org/)
* [MongoDB](https://www.mongodb.org/downloads)
* libbluetooth-dev for Ubuntu

## Installation

* `git clone <repository-url>` this repository
* install `bluez` [how-to](http://www.jaredwolff.com/blog/get-started-with-bluetooth-low-energy/)
* install `MongoDb` [how-to](http://docs.mongodb.org/manual/administration/install-on-linux/)

### Client
* change into 'client'
* `npm install`
* `bower install`

### Server
* change into 'server/[service name]'
* `npm install`
* run this command in bash  'find -path '\*noble*Release/hci-ble\' -exec sudo setcap cap_net_raw+eip '\{}\' \;'

## Running / Development

### Client
* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Server
* `npm run start`

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

#### Client
* `ember test`
* `ember test --server`

#### Server
No tests yet.

### Building

#### Client
* `ember build` (development)
* `ember build --environment production` (production)

#### Server
* `npm run build`

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [npm scripts](https://docs.npmjs.com/cli/run-script)
* [express.js](http://expressjs.com/)
* [mongoose.js](http://mongoosejs.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
