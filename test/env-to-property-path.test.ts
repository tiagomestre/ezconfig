
import { expect } from 'chai';

import { envToPropertyPath } from './../src/utils';

describe('envToPropertyPath', () => {

    context('valid environment variable', () => {

        it('should convert to a property path string', () => {
            expect(envToPropertyPath('ENV1_ENV2_ENV3')).to.be.equal('env1.env2.env3');
        });
    });
});
