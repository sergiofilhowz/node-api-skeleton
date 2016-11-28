'use strict';

var Acqua = require('acqua'),
    path = require('path'),
    config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    PowerRouter = require('express-power-router'),
    io = require('socket.io'),
    Sequelize = require('sequelize'),
    app = express(),
    server = require('http').createServer(app),
    acqua,
    powerRouter,
    dir = __dirname;

io = io.listen(server);
app.use(bodyParser.json());

/**
 * This module is an enhancement to express, working with promises and adding
 * the functionality to create interceptors so we can handle requests just by
 * configuring our routers to do so.
 */
powerRouter = PowerRouter({
    Promise : Sequelize.Promise,
    autoInitRoutes : false
});

/**
 * This is the module loader we are using in the project,
 * this module loader has dependency injection and also hotswap, so we
 * dont have to always restart out services whenever a file is changed.
 */
acqua = new Acqua({
    log : console.log,
    err : console.err,
    hotswap : process.env.NODE_ENV != 'production'
});

acqua.add('io', io);
acqua.add('app', app);
acqua.add('config', config);
acqua.add('BadRequestError', PowerRouter.BadRequestError);
acqua.add('NotFoundError', PowerRouter.NotFoundError);
acqua.add('powerRouter', powerRouter);
acqua.loadDir(path.join(dir, 'api'));
acqua.loadDir(path.join(dir, 'data'));
acqua.loadDir(path.join(dir, 'services'));
acqua.loadDir(path.join(dir, 'routers'));
var database = acqua.get('database');

if (config.get('ALLOW_ORIGIN')) {
    var origin = config.get('ALLOW_ORIGIN');
    app.use((req, res, next) => {
        if (req.headers.origin == origin) {
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
        }
        next();
    });
}

/**
 * This is the application entry point
 */
app.use('/api', powerRouter);

/**
 * Starts the application
 * @returns {Promise}
 */
exports.start = function () {
    return config.get('SYNC') && database.sync();
};

var port = config.get('PORT') || 8080;
server.listen(port, () => console.log(`Server started at port ${port}`));

exports.server = server;
exports.app = app;
exports.acqua = acqua;