
import { expect } from 'chai';

import { merge } from './../src/utils';

describe('merge', () => {

    context('two empty objects', () => {

        it('should return an empty object', () => {
            expect(merge({}, {})).to.be.empty;
        });

        it('should return a new object', () => {

            const obj1 = {};
            const obj2 = {};

            const result = merge(obj1, obj2);

            expect(result).to.not.be.equal(obj1);
            expect(result).to.not.be.equal(obj2);
        });
    });

    context('two different objects', () => {

        it('should return a new object with the combined properties of both objects', () => {

            const obj1 = { prop1: 'value1' };
            const obj2 = { prop2: 'value2' };

            const result = merge(obj1, obj2);

            expect(result).to.include({
                prop1: 'value1',
                prop2: 'value2'
            });

            expect(Object.keys(result)).to.have.length(2);
        });
    });

    context('overwrite existing p1 property', () => {

        it('should return a new object the new value of the p1 property', () => {

            const obj1 = { p1: 'v1' };
            const obj2 = { p1: 'v2' };

            const result = merge(obj1, obj2);

            expect(result).to.include({
                p1: 'v2'
            });

            expect(Object.keys(result)).to.have.length(1);
        });
    });

    context('overwrite existing p1.p2 property', () => {

        it('should return a new object the new value of the p1.p2 property', () => {

            const obj1 = { p1: { p2: 'v1' } };
            const obj2 = { p1: { p2: 'v2' } };

            const result = merge(obj1, obj2);

            expect(result.p1.p2).to.be.equal('v2');

            expect(Object.keys(result)).to.have.length(1);
            expect(Object.keys(result.p1)).to.have.length(1);
        });
    });
});
