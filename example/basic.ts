import * as ezconfig from './../src';

const defaultConfig = {
    api: {
        port: 8080,
        specialPort: 7070
    },
    otherComponent: {
        array: [],
        arrayString: '[]'
    }
};

// example only
process.env['PORT'] = '9090';
process.env['APP_OTHERCOMPONENT_ARRAY'] = '[1,2,3,4]';
process.env['APP_OTHERCOMPONENT_ARRAYSTRING'] = '"[1,2,3,4]"';

const config = ezconfig
    .create(defaultConfig)
    .json({ something: 'good' })
    .jsonFileSync('config.json')
    .envAll('APP')
    .env('PORT', 'api.port')
    .get();

console.log(config);
