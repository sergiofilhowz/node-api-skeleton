module.exports = function notificationService(io, config) {
    'use strict';

    /**
     * Functions that must be executed only once (event handling, etc) must be defined ad $init
     * and module loader will handle that.
     */
    this.$init = init;
    this.broadcast = broadcast;

    function broadcast(event, data) {
        /* istanbul ignore if */
        if (config.get('VERBOSE')) {
            console.log(event, data);
        }

        // TODO we must do a further authentication
        io.to('authenticated').emit(event, data);
    }

    function init() {
        io.on('connection', socket => {
            /* istanbul ignore if */
            if (config.get('VERBOSE')) {
                console.log('socket connected');
            }
            // TODO we must do a further authentication
            socket.join('authenticated');
        });
    }

    return this;
};