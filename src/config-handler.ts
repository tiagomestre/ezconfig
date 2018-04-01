
import * as clone from 'clone';

import {
    merge,
    readJsonFileSync,
    addPropertyToObject,
    envToPropertyPath,
    keepOriginalPropertyNames
} from './utils';

export class ConfigHandler {

    private currentConfig: { [prop: string]: any } = {};

    public json(newConfig: object): ConfigHandler {

        if (!newConfig) {
            throw new Error(`config must not be null or undefined`);
        }

        this.currentConfig = merge(this.currentConfig, newConfig);
        return this;
    }

    public jsonFileSync(filePath: string, ignoreMissing: boolean = true): ConfigHandler {

        const newConfig = readJsonFileSync(filePath);

        if (newConfig) {
            return this.json(newConfig);
        } else {
            if (!ignoreMissing) {
                throw new Error(`json file: ${filePath} does not exist`);
            }
        }

        return this;
    }

    public env(envName: string, objectPath?: string): ConfigHandler {

        if (!objectPath) {
            objectPath = envToPropertyPath(envName);
            objectPath = keepOriginalPropertyNames(this.currentConfig, objectPath);
        }

        addPropertyToObject(this.currentConfig, objectPath, JSON.parse(process.env[envName]));

        return this;
    }

    public envAll(envPrefix: string): ConfigHandler {

        Object
        .keys(process.env)
        .filter((env: string) => env.startsWith(envPrefix))
        .forEach((env: string) => {

            const propertyPath = keepOriginalPropertyNames(this.currentConfig, envToPropertyPath(env.replace(`${envPrefix}_`, '')));

            addPropertyToObject(
                this.currentConfig,
                propertyPath,
                JSON.parse(process.env[env])
            );
        });

        return this;
    }

    public get(): any {
        return clone(this.currentConfig, false);
    }
}
