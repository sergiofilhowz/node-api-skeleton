module.exports = function (sequelize, DataTypes) {
    'use strict';

    /**
     * This is a sample model, check sequelize documentation if you have any question
     */
    var Sample = sequelize.define('Sample', {
        sample_id : {
            type : DataTypes.BIGINT,
            primaryKey : true,
            autoIncrement : true
        },

        name : DataTypes.STRING
    }, {
        timestamps : true,
        tableName : 'sample',

        classMethods : {
            associate : function (models) {
                /*
                 * You can use models.YouModelName to make associations
                 * In this case I'm using models.Sample just to show that
                 * we can have access to any model imported in this directory.
                 */
                Sample.belongsTo(models.Sample, {
                    as : 'Sample',
                    foreignKey : 'sample_id'
                });
            }
        }
    });

    return Sample;
};
