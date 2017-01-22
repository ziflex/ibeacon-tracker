import path from 'path';

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const CLIENT_SRC_DIR = path.join(SRC_DIR, 'client');
const SERVER_SRC_DIR = path.join(SRC_DIR, 'server');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SERVER_DIST_DIR = DIST_DIR;
const CLIENT_DIST_DIR = path.join(SERVER_DIST_DIR, 'public');

module.exports = {
    name: 'base',
    build: {
        debug: false,
        minify: true
    },
    development: {
        port: 8080,
        watch: false
    },
    test: {
        port: 9000,
        report: 'spec'
    },
    paths: {
        root: ROOT_DIR,
        tests: path.join(ROOT_DIR, 'test'),
        doc: path.join(ROOT_DIR, 'doc'),
        meta: path.join(ROOT_DIR, 'applications'),
        input: {
            root: SRC_DIR,
            client: {
                root: CLIENT_SRC_DIR,
                images: path.join(CLIENT_SRC_DIR, 'images'),
                fonts: null, // path.join(CLIENT_SRC_DIR, 'fonts'),
                styles: path.join(CLIENT_SRC_DIR, 'styles'),
                scripts: path.join(CLIENT_SRC_DIR, 'scripts'),
                html: CLIENT_SRC_DIR
            },
            server: {
                root: SERVER_SRC_DIR,
                scripts: SERVER_SRC_DIR
            }
        },
        output: {
            root: DIST_DIR,
            client: {
                root: CLIENT_DIST_DIR,
                images: path.join(CLIENT_DIST_DIR, 'images'),
                fonts: path.join(CLIENT_DIST_DIR, 'fonts'),
                styles: path.join(CLIENT_DIST_DIR, 'styles'),
                scripts: path.join(CLIENT_DIST_DIR, 'scripts'),
                html: CLIENT_DIST_DIR
            },
            server: {
                scripts: SERVER_DIST_DIR
            }
        }
    }
};
