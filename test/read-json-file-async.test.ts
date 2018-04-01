
import { join } from 'path';
import { expect } from 'chai';

import { readJsonFileSync } from './../src/utils';

const existingJsonFile = join(__dirname, 'file1.json');

describe('readJsonFileSync', () => {

    context('existing json file with json content', () => {

        it('should return the json content of the file', () => {

            const json = readJsonFileSync(existingJsonFile);

            expect(json).to.not.be.null;
            expect(json).to.not.be.undefined;
            expect(json).to.be.an('object');
        });
    });

    context('missing json file', () => {

        it('should return null', () => {

            const json = readJsonFileSync('missing.json');

            expect(json).to.be.null;
        });
    });
});
