module.exports = function sampleRouter(powerRouter, sampleModel) {
    'use strict';

    var route = powerRouter.createRouter('/sample');

    route.get('/', list);

    function list() {
        return sampleModel.list();
    }

    /**
     * We must return the router to acqua, because express-power-router is built with
     * acqua module to handle hotswaping well.
     */
    return route;
};