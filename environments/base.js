/*eslint-disable */
var path = require('path');

var ROOT_DIR = path.resolve(__dirname, '..');
var TEST_DIR = path.join(ROOT_DIR, 'test');
var SRC_DIR = path.join(ROOT_DIR, 'src');
var CLIENT_SRC_DIR = path.join(SRC_DIR, 'client');
var SHARED_SRC_DIR = path.join(SRC_DIR, 'shared');
var SERVER_SRC_DIR = path.join(SRC_DIR, 'server');
var DIST_DIR = path.join(ROOT_DIR, 'dist');
var CLIENT_DIST_DIR = path.join(DIST_DIR, 'public');

module.exports = {
  name: 'base',
  build: {
    debug: false,
    watch: false,
    minify: true,
    port: 8080
  },
  test: {
    port: 9000,
    reporters: ['html', 'progress'],
    browsers: ['Chrome'],
    singleRun: true
  },
  paths: {
    test: {
      client: path.join(TEST_DIR, 'client'),
      server: path.join(TEST_DIR, 'server')
    },
    input: {
      root: SRC_DIR,
      scripts: {
        shared: SHARED_SRC_DIR,
        client: path.join(CLIENT_SRC_DIR, 'content/js'),
        server: SERVER_SRC_DIR
      },
      styles: path.join(CLIENT_SRC_DIR, 'content/css'),
      html: CLIENT_SRC_DIR
    },
    output: {
      root: DIST_DIR,
      scripts: {
        client: path.join(CLIENT_DIST_DIR, 'content/js'),
        server: DIST_DIR,
        shared: path.join(DIST_DIR, 'shared')
      },
      styles: path.join(CLIENT_DIST_DIR, 'content/css'),
      html: CLIENT_DIST_DIR,
      docs: ROOT_DIR
    }
  }
};
/*eslint-enable */
