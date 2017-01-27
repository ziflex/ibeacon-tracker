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
import Logger from '../../../../mock/logger';
import Engine from '../../../../mock/server/scanner-engine';
import Scanner from '../../../../../src/server/domain/tracking/scanner';

describe('Server. Domain. Scanner', () => {
    describe('#constructor', () => {
        context('When arguments are missed or invalid', () => {
            it('should throw an error', () => {
                expect(() => {
                    return Scanner();
                }, 'no args').to.throw(Error);

                expect(() => {
                    return Scanner(Logger());
                }, 'no engine').to.throw(Error);

                expect(() => {
                    return Scanner(Logger(), { start: _.noop, stop: _.noop });
                }, 'invalid negine interface').to.throw(Error);
            });
        });
    });

    describe('.start', () => {
        it('should start scanning', () => {
            const onStart = sinon.spy();
            const engine = Engine({ onStart });
            const scanner = Scanner(Logger(), engine);

            scanner.start();
            expect(onStart.callCount).to.eql(1);
            expect(engine.listeners('discover').length).to.eql(1);
        });

        it('should notify on "discover" event', () => {
            const onDiscover = sinon.spy();
            const engine = Engine();
            const scanner = Scanner(Logger(), engine);

            scanner.start();
            scanner.subscribe('discover', onDiscover);

            engine.emitDiscover();

            expect(onDiscover.called).to.be.true;
            expect(onDiscover.args[0][0]).to.exist;
        });
    });

    describe('.stop', () => {
        it('should start scanning', () => {
            const onStop = sinon.spy();
            const engine = Engine({ onStop });
            const scanner = Scanner(Logger(), engine);

            scanner.start();
            scanner.stop();
            expect(onStop.callCount).to.eql(1);
            expect(engine.listeners('discover').length).to.eql(0);
        });

        it('should not notify on "discover" event', () => {
            const onDiscover = sinon.spy();
            const engine = Engine();
            const scanner = Scanner(Logger(), engine);

            scanner.start();
            scanner.subscribe('discover', onDiscover);
            scanner.stop();

            engine.emitDiscover();

            expect(onDiscover.called).to.be.false;
        });
    });
});
