## ezconfig

[![npm version](https://badge.fury.io/js/ezconfig-node.svg)](https://badge.fury.io/js/ezconfig-node)
[![Build Status](https://travis-ci.org/tiagomestre/ezconfig.svg)](https://travis-ci.org/tiagomestre/ezconfig)
[![Coverage Status](https://coveralls.io/repos/github/tiagomestre/ezconfig/badge.svg)](https://coveralls.io/github/tiagomestre/ezconfig)
[![dependencies Status](https://david-dm.org/tiagomestre/ezconfig/status.svg)](https://david-dm.org/tiagomestre/ezconfig)
[![devDependencies Status](https://david-dm.org/tiagomestre/ezconfig/dev-status.svg)](https://david-dm.org/tiagomestre/ezconfig?type=dev)

Tool to simplify the configuration of a node application.

### Installation

You can get the latest release and the type definitions using npm:

```
$ npm install --save ezconfig-node 
```

### Example
```javascript

import * as ezconfig from 'ezconfig-node';

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
    .jsonFileSync('config.json') // file: { "api": { "specialPort": 6060 } }
    .envAll('APP')
    .env('PORT', 'api.port')
    .get();

console.log(config);
```

**Result:**
```json
{
    "api": {
        "port": 9090,
        "specialPort": 6060
    },
    "otherComponent": {
        "array": [1,2,3,4],
        "arrayString": "[1,2,3,4]"
    },
    "something": "good"
}
```

### Methods

**json**

Merge the old configuration with a new json object.

```javascript
// creates configuration { "a": 2, "b": 3 }
ezconfig.create({ a: 1 }).json({ a: 2, b: 3 })
```

**jsonFileSync**


```javascript
ezconfig.create().jsonFileSync('config.json').get()
```

**env**

Use the specific environment variable to overwrite a property of the config.

```javascript
// Creates the object { "api": { port: API_PORT } }
ezconfig.create({ api: { port: 8080 } }).env('API_PORT').get()
```

Use the second parameter to choose the property.

```javascript
// Creates the object { "api": { port: PORT_VALUE } }
ezconfig.create({ api: { port: 8080 }).env('PORT', 'api.port').get()
```

If the property path is not set, it will use the environment variable name in lowercase.

```javascript
// Creates the object { "api": { port: 8080 }, "port": PORT_VALUE }
ezconfig.create({ api: { port: 8080 }).env('PORT').get()
```

**envAll**

Use all the environment variables that start with the specific prefix.

```ts
// APP_API_PORT = '8080'
// APP_SOMETHING = '"good"'

ezconfig.create().envAll('APP').get()

// result: { "api": { "port": 8080 }, "something": "good" }
```

**get**

Returns the current configuration.

```ts
// returns object { "a": 1 }
ezconfig.create({ a: 1 }).get()
```

### Caveat

The method **env** and **envAll** will keep the properties original names if they already exist with uppercase letters, example:

 ```ts
// SOMETHINGGREAT = "ezconfig again"

ezconfig.create({ somethingGreat: 'ezconfig' }).env('SOMETHINGGREAT').get()

// result: { "somethingGreat": "ezconfig again" }
```
