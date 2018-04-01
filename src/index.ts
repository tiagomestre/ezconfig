
import { ConfigHandler } from './config-handler';

export function create(baseConfig?: any) {

    const configHandler = new ConfigHandler();

    if (baseConfig) {
        configHandler.json(baseConfig);
    }

    return configHandler;
}
