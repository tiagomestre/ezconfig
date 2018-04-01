
import * as fs from 'fs';

import * as clone from 'clone';

export function merge(base: any, newObject: any): any {

    base = clone(base, false);
    newObject = clone(newObject, false);

    for (const prop in newObject) {

        if (base[prop] === null || base[prop] === undefined) {
            base[prop] = newObject[prop];
            continue;
        }

        if (base[prop] instanceof Object && !(base[prop] instanceof Array || base[prop] instanceof Map || base[prop] instanceof Set)) {
            base[prop] = this.merge(base[prop], newObject[prop]);
        } else {
            base[prop] = newObject[prop];
        }
    }

    return base;
}

export function readJsonFileSync(filePath: string): any {
    return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath).toString('utf8')) : null;
}

export function envToPropertyPath(env: string): string {
    return env.replace(/_/g, '.').toLowerCase();
}

function isBasicObject(value: any) {
    return typeof(value) === 'object' && !(Array.isArray(value) || value instanceof Map || value instanceof Set);
}

export function keepOriginalPropertyNames(object: any, propertyPath: string): string {

    const propertyPathArray: string[] = propertyPath.split('.');

    for (let index = 0; index < propertyPathArray.length; index++) {

        const objectProperties: string[] = Object.keys(object);
        const objectPropertiesLowercase: string[] = objectProperties.map((property: string) => property.toLowerCase());

        const propertyPathPart: string = propertyPathArray[index].toLowerCase();

        const foundIndex: number = objectPropertiesLowercase.indexOf(propertyPathPart);

        if (foundIndex !== -1) {

            propertyPathArray[index] = objectProperties[foundIndex];

            const value = object[objectProperties[foundIndex]];

            if (isBasicObject(value) && value !== null && value !== undefined) {
                object = value;
                continue;
            }
        }

        break;
    }

    return propertyPathArray.join('.');
}

export function addPropertyToObject(object: any, propertyPath: string, value: any): void {

    const propertyPathArray = propertyPath.split('.');

    for (let index = 0; index < propertyPathArray.length; index++) {

        const propertyName = propertyPathArray[index];

        if (index === propertyPathArray.length - 1) {
            object[propertyName] = value;
            return;
        }

        if (!object[propertyName] || !isBasicObject(object[propertyName])) {
            object[propertyName] = {};
        }

        object = object[propertyName];
    }
}
