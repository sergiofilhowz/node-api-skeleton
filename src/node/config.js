/**
 * This module is used to abstract the configuration recovery in test, development
 * and in production (which must be using environment variable for loadbalancing).
 */
'use strict';

var _ = require('lodash'),
    cfg = require('config'),
    config = {},
    production = process.env.NODE_ENV == 'production';

_.forEach(process.env, (value, key) => config[key] = value);

if (!production && !process.env.USE_ENVS) {
    // overrides process.env
    _.forEach(cfg, (value, key) => {
        config[key] = value;
    });
}

/**
 * Checks if the variable is defined
 */
exports.has = function (name) {
    return config[name] !== undefined;
};

/**
 * Get the variable value
 */
exports.get = function (name) {
    return config[name];
};

/**
 * Get the variable as boolean, note this is necessary if the variable is declared as
 * environment variable, the value is a string of "true" or "false".
 */
exports.getBoolean = function (name) {
    return config[name] == 'true' || config[name] === true;
};

/**
 * Set the value of a variable
 * ! Not recommended to use in production
 */
exports.set = function (name, value) {
    config[name] = value;
};