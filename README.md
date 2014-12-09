kc-env-config
=============

A simple module to load your config from the environment. You pass in a valid config object full of all your defaults. It will traverses over that object and replaces the default values with values from the environment if they exist. It's called recursively on nested objects. Only supports numbers, strings, and booleans for data.

###Install

`npm i --save env-config`

###Usage

`var config = load(defaults, environment, prefix, loose)`

 - `defaults`: required. Your config object. Can contain numbers, strings, booleans, and more nested objects.
 - `environment`: required. Usually just `process.env`
 - `prefix`: optional. default=''. The key prefix on your environment.
 - `loose`: optional. default=false. If a matching key exists on the environment, use it no matter the type (will end up as a string). (default: only use environment variables when the key matches AND the type is the same. Type is saved)

###Example

Environment Variables:
```bash
export PROJECT_PORT=4545
export PROJECT_DB_HOST=192.168.1.5
```

Code:
```javascript
var load = require('kc-env-config');

var defaults = {
  port: 3000,
  db: {
    host: 'localhost',
    port: 28015
  }
};

var config = load(defaults, process.env, 'PROJECT');
console.log(config);
```

Outputted Config:
```json
{
  "port": 4545,
  "db": {
    "host": "192.168.1.5",
    "port": 28015
  }
}
```
