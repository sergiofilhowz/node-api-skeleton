/**
 * This interceptor will remove any content from the response.
 */
module.exports = function nocontentInterceptor(powerRouter) {
    'use strict';
    powerRouter.createInterceptor({
        intercepts : parameters => parameters.nocontent,
        execute : (parameters, req, res, stack) => {
            return stack.next().then(() => {});
        }
    });
};