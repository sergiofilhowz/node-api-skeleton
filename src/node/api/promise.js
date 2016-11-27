var Sequelize = require('sequelize');

module.exports = function Promise() {
    'use strict';
    /*
     * Although we have a core Promise in NodeJS since 0.12, for compatibility reasons I am going to use
     * the Sequelize`s bluebird Promise.
     */
    return Sequelize.Promise;
}