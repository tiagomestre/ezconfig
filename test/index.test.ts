
import { expect } from 'chai';

import * as ezconfig from './../src';
import { ConfigHandler } from './../src/config-handler';

describe('config', () => {

    context('create a new ConfigHandler', () => {

        it('should create a new instance of ConfigHandler', () => {

            const configHandler = ezconfig.create();

            expect(configHandler).to.be.instanceof(ConfigHandler);
            expect(configHandler.get()).to.be.empty;
        });
    });

    context('create a new ConfigHandler with a base config', () => {

        it('should create a new instance of ConfigHandler', () => {

            const configHandler = ezconfig.create({ p1: 'v1' });

            expect(configHandler).to.be.instanceof(ConfigHandler);

            expect(configHandler.get()).to.include({
                p1: 'v1'
            });
        });
    });
});
