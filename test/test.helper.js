'use strict';
process.env.NODE_ENV = 'test';

var _ = require('lodash'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    main = require('../src/node'),
    Sequelize = require('sequelize'),
    Promise = Sequelize.Promise,
    server = main.server,
    acqua = main.acqua;

chai.use(chaiHttp);
chai.should();

var database = acqua.get('database'),
    sequelize = acqua.get('sequelize'),
    config = acqua.get('config');

exports.chai = chai;
exports.expect = chai.expect;
exports.acqua = acqua;
exports.server = server;

exports.sync = function () {
    if (config.get('DB_DIALECT') == 'mysql') {
        return sequelize.query('SELECT table_name FROM information_schema.tables WHERE table_schema = ?', {
            replacements : [config.get('DB_NAME')]
        }).spread(tables => {
            if (tables.length === 0) {
                return;
            }

            var queries = ['SET foreign_key_checks = 0;'];
            _.forEach(tables, table => {
                queries.push('DROP TABLE IF EXISTS `' + table.table_name + '`;');
            });
            queries.push('SET foreign_key_checks = 1;');
            return sequelize.query(queries.join('\n'));
        }).then(() => database.sync());
    }
};

exports.request = request;
exports.put = put;
exports.post = post;
exports.get = get;
exports.delete = _delete;

function put(path, body) {
    var result = request().put(path);
    if (body) {
        result.send(body);
    }
    return handleRequest(result);
}

function post(path, body) {
    var result = request().post(path);
    if (body) {
        result.send(body);
    }
    return handleRequest(result);
}

function get(path) {
    return handleRequest(request().get(path));
}

function _delete(path) {
    return handleRequest(request().delete(path));
}

function request() {
    return chai.request(server);
}

function handleRequest(result) {
    return new Promise((resolve, reject) => {
        result.end((err, res) => {
            if (err && res.status != '404') return reject(err);
            resolve(res);
        });
    });
}