var _ = require('lodash'),
    Sequelize = require('sequelize'),
    path = require('path'),
    SequelizeMigration = require('sequelize-migration-2');

/**
 * This module will handle the database itself
 */
module.exports = function database(acqua, config) {
    'use strict';

    const LOGGING = config.get('VERBOSE') && console.log,
        DIALECT = config.get('DB_DIALECT'),
        DB_NAME = config.get('DB_NAME'),
        DB_USERNAME = config.get('DB_USERNAME'),
        DB_PASSWORD = config.get('DB_PASSWORD'),
        DB_SOCKET_PATH = config.get('DB_SOCKET_PATH'),
        DB_HOST = config.get('DB_HOST'),
        DB_PORT = config.get('DB_PORT'),
        DB_POOL_MAX_CONNECTIONS = config.get('DB_POOL_MAX_CONNECTIONS'),
        DB_POOL_MAX_IDLE_TIME = config.get('DB_POOL_MAX_IDLE_TIME'),
        DB_MAX_CONCURRENT_QUERIES = config.get('DB_MAX_CONCURRENT_QUERIES');

    var models = {},
        sequelize,
        migration;

    sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
        host : DB_HOST,
        port : DB_PORT,
        logging : LOGGING,

        maxConcurrentQueries: DB_MAX_CONCURRENT_QUERIES,

        dialect : DIALECT,

        dialectOptions : {
            socketPath : DB_SOCKET_PATH,
            supportBigNumbers : true,
            bigNumberStrings : true,
            multipleStatements : config.get('SYNC')
        },

        define : {
            underscored : true,
            freezeTableName : false,
            syncOnAssociation : true,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            timestamps : true,
            constraints : false,

            updatedAt : 'updated_at',
            createdAt : 'created_at',
            deletedAt : 'removed_at',

            paranoid : false
        },

        sync : { force : false },
        syncOnAssociation : true,
        pool : {
            maxConnections : DB_POOL_MAX_CONNECTIONS,
            maxIdleTime : DB_POOL_MAX_IDLE_TIME
        },
        language : 'en'
    });

    migration = new SequelizeMigration(sequelize);

    migration.addModule({
        name : 'node-api',
        dir : path.join(__dirname, '..', '..', 'db')
    });

    /**
     * Will load models in a given folder
     * @param {string} dir Folder to load models
     */
    this.loadModels = function (dir) {
        acqua.loadDir(dir, path => {
            var model = sequelize.import(path);
            models[model.name] = model;
        });
    };

    /**
     * Will associate all loaded models
     */
    this.associateModels = function () {
        _.forEach(models, model => {
            if (model.hasOwnProperty('associate')) {
                model.associate(models);
            }
        });
    };

    this.sync = function () {
        return migration.sync();
    };

    this.loadModels(path.join(__dirname, '..', 'models'));
    this.associateModels();

    acqua.add('models', models);
    acqua.add('sequelize', sequelize);

    this.models = models;
    this.sequelize = sequelize;

    return this;
};