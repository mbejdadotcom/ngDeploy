var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            name:'console',
            handleExceptions: true,
            json: false,
            colorize: true,
            formatter: function(options) {
                // Return string will be passed to logger.
                return ' '+ (undefined !== options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
            }
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message){
        logger.info(message);
    }
};