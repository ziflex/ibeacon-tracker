/*
eslint-disable no-unused-expressions,
import/no-extraneous-dependencies,
import/no-unresolved,
import/extensions,
lodash/import-scope
*/
import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import uuid from 'uuid';
import { generate as Guid } from '../../../../../src/common/utils/guid';
import Logger from '../../../../mock/logger';
import Engine from '../../../../mock/server/scanner-engine';
import Scanner from '../../../../../src/server/domain/discovery/scanner';
import Tracker from '../../../../../src/server/domain/discovery/tracker';

describe('Server. Domain. Discovery. Scanner', () => {
    describe('#constructor', () => {
        context('When arguments are missed or invalid', () => {
            it('should throw an error', () => {
                expect(() => {
                    return Tracker();
                }, 'no args').to.throw(Error);

                expect(() => {
                    return Tracker(Logger());
                }, 'no settings').to.throw(Error);

                expect(() => {
                    return Tracker(Logger(), {});
                }, 'missed "ttl" and "interval"').to.throw(Error);

                expect(() => {
                    return Tracker(Logger(), { ttl: 10000 });
                }, 'missed interval"').to.throw(Error);

                expect(() => {
                    return Tracker(Logger(), { interval: 10000 });
                }, 'missed "ttl"').to.throw(Error);

                expect(() => {
                    return Tracker(Logger(), { ttl: 10000, interval: '1000' });
                }, 'invalid "interval"').to.throw(Error);

                expect(() => {
                    return Tracker(Logger(), { ttl: '10000', interval: 10000 });
                }, 'invalid "ttl"').to.throw(Error);

                expect(() => {
                    return Tracker(Logger(), { ttl: 500, interval: 10000 });
                }, 'invalid "ttl" range').to.throw(Error);

                expect(() => {
                    return Tracker(Logger(), { ttl: 5000, interval: 100 });
                }, 'invalid "interval" range').to.throw(Error);
            });
        });
    });

    let engine = null;
    let scanner = null;
    let clock = null;

    beforeEach(() => {
        engine = Engine();
        scanner = Scanner(Logger(), engine);
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    describe('.start', () => {
        it('should allow to track beacons', () => {
            const tracker = Tracker(Logger(), { ttl: 1000, interval: 1000 });

            expect(_.size(tracker.items())).to.eql(0);

            scanner.subscribe('discover', peripheral => tracker.push(peripheral));
            tracker.start();
            scanner.start();

            engine.emitDiscover();
            engine.emitDiscover();
            engine.emitDiscover();

            expect(_.size(tracker.items())).to.eql(3);
        });

        it('should notify "found" event for new beacons', () => {
            const onFound = sinon.spy();
            const tracker = Tracker(Logger(), { ttl: 1000, interval: 1000 });

            scanner.subscribe('discover', peripheral => tracker.push(peripheral));
            tracker.start();
            scanner.start();
            tracker.subscribe('found', onFound);

            const existing = { uuid: uuid.v4(), major: 11, minor: 1 };

            engine.emitDiscover();
            engine.emitDiscover();
            engine.emitDiscover(existing.uuid, existing.major, existing.minor);
            engine.emitDiscover(existing.uuid, existing.major, existing.minor);
            engine.emitDiscover(existing.uuid, existing.major, existing.minor);

            expect(_.size(tracker.items())).to.eql(3);

            expect(onFound.callCount).to.eql(3);
            expect(onFound.args[2][0]).to.eql(Guid(existing));
        });

        it('should notify "lost" for beacons that are not discovered anymore', () => {
            const onLost = sinon.spy();

            const tracker = Tracker(Logger(), { ttl: 1000, interval: 1000 });

            scanner.subscribe('discover', peripheral => tracker.push(peripheral));
            tracker.start();
            scanner.start();
            tracker.subscribe('lost', onLost);

            const beacon1 = { uuid: uuid.v4(), major: 11, minor: 1 };
            const beacon2 = { uuid: uuid.v4(), major: 11, minor: 2 };

            engine.emitDiscover(beacon1.uuid, beacon1.major, beacon1.minor);
            engine.emitDiscover(beacon2.uuid, beacon2.major, beacon2.minor);

            clock.tick(1000);

            engine.emitDiscover(beacon1.uuid, beacon1.major, beacon1.minor);

            clock.tick(1000);

            engine.emitDiscover(beacon1.uuid, beacon1.major, beacon1.minor);

            clock.tick(1000);

            expect(_.size(tracker.items())).to.eql(1);

            expect(onLost.callCount).to.eql(1);
            expect(onLost.args[0][0]).to.eql(Guid(beacon2));
        });
    });

    describe('.stop', () => {
        it('should not allow to track beacons', () => {
            const tracker = Tracker(Logger(), { ttl: 1000, interval: 1000 });

            scanner.subscribe('discover', peripheral => tracker.push(peripheral));

            tracker.start();
            tracker.stop();
            scanner.start();

            expect(() => {
                engine.emitDiscover();
            }).to.not.throw(Error);
        });

        it('should not notify "found" event for new beacons', () => {
            const onFound = sinon.spy();
            const tracker = Tracker(Logger(), { ttl: 1000, interval: 1000 });

            scanner.subscribe('discover', peripheral => tracker.push(peripheral));
            tracker.start();
            tracker.stop();
            scanner.start();
            tracker.subscribe('found', onFound);

            const existing = { uuid: uuid.v4(), major: 11, minor: 1 };

            engine.emitDiscover();
            engine.emitDiscover();
            engine.emitDiscover(existing.uuid, existing.major, existing.minor);
            engine.emitDiscover(existing.uuid, existing.major, existing.minor);
            engine.emitDiscover(existing.uuid, existing.major, existing.minor);

            expect(_.size(tracker.items())).to.eql(0);

            expect(onFound.callCount).to.eql(0);
        });

        it('should not notify "lost" when stopped', () => {
            const onLost = sinon.spy();

            const tracker = Tracker(Logger(), { ttl: 1000, interval: 1000 });

            scanner.subscribe('discover', peripheral => tracker.push(peripheral));
            tracker.start();
            scanner.start();
            tracker.subscribe('lost', onLost);

            const beacon1 = { uuid: uuid.v4(), major: 11, minor: 1 };
            const beacon2 = { uuid: uuid.v4(), major: 11, minor: 2 };

            engine.emitDiscover(beacon1.uuid, beacon1.major, beacon1.minor);
            engine.emitDiscover(beacon2.uuid, beacon2.major, beacon2.minor);

            expect(_.size(tracker.items())).to.eql(2);

            tracker.stop();

            expect(_.size(tracker.items())).to.eql(0);

            clock.tick(1000);

            engine.emitDiscover(beacon1.uuid, beacon1.major, beacon1.minor);

            clock.tick(1000);

            engine.emitDiscover(beacon1.uuid, beacon1.major, beacon1.minor);

            clock.tick(1000);

            expect(onLost.callCount).to.eql(0);
        });
    });
});
