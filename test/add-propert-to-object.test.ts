
import { expect } from 'chai';

import { addPropertyToObject } from './../src/utils';

describe('addPropertyToObject', () => {

    context('add "p1" property to an empty object', () => {

        it('should add property "p1" to the object', () => {

            const obj: any = {};

            addPropertyToObject(obj, 'p1', 'v1');

            expect(obj).to.have.ownProperty('p1');
            expect(obj.p1).to.equal('v1');
        });
    });

    context('add "p1.p2" property to an empty object', () => {

        it('should add property "p1.p2" to the object', () => {

            const obj: any = {};

            addPropertyToObject(obj, 'p1.p2', 'v2');

            expect(obj).to.have.ownProperty('p1');
            expect(obj.p1).to.be.an('object');
            expect(obj.p1).to.have.ownProperty('p2');
            expect(obj.p1.p2).to.be.equal('v2');
        });
    });

    context('add "p1.p2.p3" property to an empty object', () => {

        it('should add property "p1.p2.p3" to the object', () => {

            const obj: any = {};

            addPropertyToObject(obj, 'p1.p2.p3', 'v3');

            expect(obj).to.have.ownProperty('p1');
            expect(obj.p1).to.be.an('object');
            expect(obj.p1).to.have.ownProperty('p2');
            expect(obj.p1.p2).to.be.an('object');
            expect(obj.p1.p2).to.have.ownProperty('p3');
            expect(obj.p1.p2.p3).to.be.equal('v3');
        });
    });

    context('add "p1.p2.p3" and p1 is null', () => {

        it('should add property "p1.p2.p3" to the object', () => {

            const obj: any = { p1: null };

            addPropertyToObject(obj, 'p1.p2.p3', 'v3');

            expect(obj).to.have.ownProperty('p1');
            expect(obj.p1).to.be.an('object');
            expect(obj.p1).to.have.ownProperty('p2');
            expect(obj.p1.p2).to.be.an('object');
            expect(obj.p1.p2).to.have.ownProperty('p3');
            expect(obj.p1.p2.p3).to.be.equal('v3');
        });
    });

    context('add "p1.p2.p3" and p1 is a non object', () => {

        it('should add property "p1.p2.p3" to the object', () => {

            const obj: any = { p1: 123 };

            addPropertyToObject(obj, 'p1.p2.p3', 'v3');

            expect(obj).to.have.ownProperty('p1');
            expect(obj.p1).to.be.an('object');
            expect(obj.p1).to.have.ownProperty('p2');
            expect(obj.p1.p2).to.be.an('object');
            expect(obj.p1.p2).to.have.ownProperty('p3');
            expect(obj.p1.p2.p3).to.be.equal('v3');
        });
    });

    context('add "p1.p2.p3" and p1 an empty object', () => {

        it('should add property "p1.p2" to the object', () => {

            const obj: any = { p1: {} };

            addPropertyToObject(obj, 'p1.p2.p3', 'v3');

            expect(obj).to.have.ownProperty('p1');
            expect(obj.p1).to.be.an('object');
            expect(obj.p1).to.have.ownProperty('p2');
            expect(obj.p1.p2).to.be.an('object');
            expect(obj.p1.p2).to.have.ownProperty('p3');
            expect(obj.p1.p2.p3).to.be.equal('v3');
        });
    });
});
