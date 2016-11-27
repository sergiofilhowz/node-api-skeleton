/**
 * This module will handle data retrieval and querying, you are able to
 * create projections (object layouts), criterias (filtering), and sorts.
 * And then use them whenever you want, you can use one projection with several criterias or not.
 *
 * Check saphyre-data if you want to understand more about this module
 */
module.exports = function sampleModel(SaphyreData, models) {
    'use strict';

    var Sample = models.Sample,
        model = SaphyreData.createModel(Sample);

    this.list = list;

    model.projection('list', {
        '$id' : 'id',
        'name' : 'name'
    });

    model.sort('creation', {
        '$id' : 'ASC'
    });

    function list() {
        return model.list({
            projection : 'list',
            sort : 'creation'
        });
    }

    return this;
};