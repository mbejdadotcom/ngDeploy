'use strict';

var logger = require('./logger');
var utils = require('./utils');
var auth = require('./auth');
var config = require('./config');

var authedRequest = auth.request;

module.exports = {
    add: function add(opts){
    var domain = opts.domain;
    var appId = opts.appId || config.get('id');

    var obj = {id:Number(appId), domain:domain};

    if( !appId || !domain ) {
        return utils.fatal("Missing domain or id. ", 1);
    }

    authedRequest(opts.accountToken).post({
        url: 'https://api.ngdeploy.com/apps/domains',
        body: obj
    }, function (error, response, body) {
        if (error) {
            return utils.fatal('Failed to create app: ' + obj, 1);
        }

        if (body.error) {
            return utils.fatal('Error creating app: '+ body.error, 1);
        } else if (body.response) {
            return logger.info("Successfully added domain. It'll take about 5 minutes for everything to propagate.");
        }
        });
    },

upgrade: function upgrade(opts){
    var appId = opts.appId || config.get('id');

    if (!appId) {
        return utils.fatal("Missing appId.", 1);
    }

    var obj = {id: Number(appId)};

    authedRequest(opts.accountToken).post({
        url: 'https://api.ngdeploy.com/apps/upgrades',
        body: obj
    }, function (error, response, body) {
        if (error) {
            return utils.fatal('Failed to upgrade app: ' + obj, 1);
        }

        if (body.error) {
            return utils.fatal('Failed to upgrade app: ' + body.error, 1);
        }

        if (body.response) {
            return logger.info("Successfully upgraded domain.");
        }
    });
},

purge: function purge(opts) {
    var obj = {id: Number(opts.appId)};

    if (!opts.appId) {
        return utils.fatal("Missing app id or app name. ", 1);
    }

    authedRequest(opts.accountToken).post({
        url: 'https://api.ngdeploy.com/apps/purges',
        body: obj
    }, function (error, response, body) {
        if (error) {
            return utils.fatal('Failed to purge the domain: ' + obj, 1);
        }

        if (body.error) {
            return utils.fatal('Failed to purge the domain: ' + body.error, 1);
        } else if (body.response) {
            return logger.info("Successfully purged the cache for app.");
        }
     });
    }
};