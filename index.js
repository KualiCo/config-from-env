var _ = require('lodash');

module.exports = function (defaults, env, prefix, loose) {
  var obj = _.clone(defaults);
  var str = prefix ? prefix + '_' : '';
  getConfigs(obj, env, str, loose);
  return obj;
};

function getConfigs(obj, env, curStr, loose) {
  _.each(obj, function (val, key) {
    // if it's an object, recurse
    if (_.isObject(val)) return getConfigs(val, env, curStr + key + '_');

    // if it doesn't exist, do nothing
    var envKey = (curStr + key).toUpperCase();
    var envVal = env[envKey];
    if (!envVal) return;

    // if it exists and loose is on, just set it
    if (loose) return obj[key] = envVal;

    // otherwise, try and set the config, only if the types match
    if (_.isNumber(val)) {
      obj[key] = +envVal || val;
    } else if (_.isBoolean(val)) {
      obj[key] = toBoolean(envVal) !== null ? toBoolean(envVal) : val;
    } else if (_.isString(val)) {
      obj[key] = envVal;
    }
  });
}

function toBoolean(val) {
  if (val === 'false') return false;
  if (val === 'true') return true;
  return null;
}
