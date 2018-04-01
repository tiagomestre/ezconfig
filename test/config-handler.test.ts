
import { join } from 'path';
import { expect } from 'chai';

import { ConfigHandler } from './../src/config-handler';

const existingJsonFile = join(__dirname, 'file1.json');

describe('ConfigHandler', () => {

    describe('#json', () => {

        context('add new json', () => {

            it('should overwrite the current empty config', () => {

                const configHandler = new ConfigHandler();

                configHandler.json({ prop1: 'value1' });

                const config = configHandler.get();

                expect(config).to.be.include({ prop1: 'value1' });
                expect(Object.keys(config)).to.have.length(1);
            });
        });

        context('null', () => {

            it('should throw error', () => {

                expect(() => {
                    new ConfigHandler().json(null);
                }).throw(Error).and.contains({
                    message: 'config must not be null or undefined'
                });
            });
        });
    });

    describe('#jsonFileSync', () => {

        context('existing json file', () => {

            it('should overwrite the current empty config with the json file content', () => {

                const configHandler = new ConfigHandler();

                configHandler.jsonFileSync(existingJsonFile);

                const config = configHandler.get();

                expect(config).to.be.include({ p1: 'v1' });
                expect(Object.keys(config)).to.have.length(1);
            });
        });

        context('missing json file and ignore missing file true (default)', () => {

            it('should overwrite the current empty config with the json file content', () => {

                const configHandler = new ConfigHandler();

                configHandler.jsonFileSync('missing.json');

                const config = configHandler.get();

                expect(config).to.be.empty;
            });
        });

        context('missing json file and ignore missing file false', () => {

            it('should overwrite the current empty config with the json file content', () => {

                const configHandler = new ConfigHandler();

                expect(() => { configHandler.jsonFileSync('missing.json', false); }).to.throw(Error);
            });
        });
    });

    describe('#env', () => {

        context('existing environment variable (E1) with property path (p1)', () => {

            before(() => {
                process.env['E1'] = '"v1"';
            });

            it('should return an object with the property p1 with value "v1"', () => {

                const configHandler = new ConfigHandler();

                configHandler.env('E1', 'p1');

                const config = configHandler.get();

                expect(config).to.include({
                    p1: 'v1'
                });

                expect(Object.keys(config)).to.have.length(1);
            });

            after(() => {
                delete process.env['E1'];
            });
        });

        context('existing environment variable (E1) with no property path', () => {

            before(() => {
                process.env['E1'] = '"v1"';
            });

            it('should return an object with the property e1 with value "v1"', () => {

                const configHandler = new ConfigHandler();

                configHandler.env('E1');

                const config = configHandler.get();

                expect(config).to.include({
                    e1: 'v1'
                });

                expect(Object.keys(config)).to.have.length(1);
            });

            after(() => {
                delete process.env['E1'];
            });
        });

        context('existing environment variable (E1) with no property path and an existing property E1', () => {

            before(() => {
                process.env['E1'] = '"v1"';
            });

            it('should return an object with the property e1 with value "v1"', () => {

                const configHandler = new ConfigHandler();

                configHandler.json({ E1: 'v2' });
                configHandler.env('E1');

                const config = configHandler.get();

                expect(config).to.include({
                    E1: 'v1'
                });

                expect(Object.keys(config)).to.have.length(1);
            });

            after(() => {
                delete process.env['E1'];
            });
        });

        context('existing environment variable (E1_E2) with no property path and an existing property E1.E2', () => {

            before(() => {
                process.env['E1_E2'] = '"v2"';
            });

            it('should return an object with the property E1.E2 with value "v2"', () => {

                const configHandler = new ConfigHandler();

                configHandler.json({ E1: { E2: 'v1' } });
                configHandler.env('E1_E2');

                const config = configHandler.get();

                expect(config.E1).to.exist;
                expect(config.E1.E2).to.exist;
                expect(config.E1.E2).to.be.equal('v2');
                expect(Object.keys(config)).to.have.length(1);
                expect(Object.keys(config.E1)).to.have.length(1);
            });

            after(() => {
                delete process.env['E1_E2'];
            });
        });

        context('existing environment variable (E1_E2) with no property path', () => {

            before(() => {
                process.env['E1_E2'] = '"v1"';
            });

            it('should return an object with the property e1.e2 with value "v1"', () => {

                const configHandler = new ConfigHandler();

                configHandler.env('E1_E2');

                const config = configHandler.get();

                expect(config.e1).to.exist;
                expect(config.e1.e2).to.be.equal('v1');
                expect(Object.keys(config)).to.have.length(1);
                expect(Object.keys(config.e1)).to.have.length(1);
            });

            after(() => {
                delete process.env['E1_E2'];
            });
        });
    });

    describe('#envAll', () => {

        context('multiple environment variables with prefix "TEST"', () => {

            before(() => {
                process.env['TEST_P1'] = '"v1"';
                process.env['TEST_P2_P3'] = '"v2"';
                process.env['TEST_P2_P4'] = '"v3"';
            });

            it('should return an ', () => {

                const configHandler = new ConfigHandler();

                configHandler.envAll('TEST');

                const config = configHandler.get();

                expect(config.p1).to.be.equal('v1');
                expect(config.p2.p3).to.be.equal('v2');
                expect(config.p2.p4).to.be.equal('v3');
            });

            after(() => {
                delete process.env['TEST_P1'];
                delete process.env['TEST_P2_P3'];
                delete process.env['TEST_P2_P4'];
            });
        });
    });

    describe('#get', () => {

        context('base config', () => {

            it('should return an empty object', () => {

                const configHandler = new ConfigHandler();

                expect(configHandler.get()).to.be.empty;
            });
        });
    });
});
