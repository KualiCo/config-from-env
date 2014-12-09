var assert = require('assert');
var load = require('../');

// Default Test Args

var defaultConfig = {
  port: 4000,
  db: {
    host: 'localhost',
    port: 5984
  },
  foo: 3453
};

var env = {
  PROJECT_PORT: '5000',
  PROJECT_DB_HOST: 'dockerhost',
  PROJECT_FOO: 'This shouldn\'t overwrite cuz it\'s a string'
};

var env2 = {
  PORT: '5000',
  DB_HOST: 'dockerhost',
  FOO: 'This shouldn\'t overwrite cuz it\'s a string'
};

// Config should get overwritten with appropriate env values

var c = load(defaultConfig, env, 'PROJECT');

assert(c.port === 5000);
assert(c.db.host === 'dockerhost');
assert(c.db.port === 5984);
assert(c.foo === 3453);

// Config should get overwritten with any env values, no matter the type

var c2 = load(defaultConfig, env, 'PROJECT', true);

assert(c2.port === '5000');
assert(c2.db.host === 'dockerhost');
assert(c2.db.port === 5984);
assert(c2.foo === 'This shouldn\'t overwrite cuz it\'s a string');

// Lib works great without any prefix

var c3 = load(defaultConfig, env2);

assert(c3.port === 5000);
assert(c3.db.host === 'dockerhost');
assert(c3.db.port === 5984);
assert(c3.foo === 3453);





console.log('All Tests Passed!');
