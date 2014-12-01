// TODO try to extract the require.config file into a dependencies.js

require.config({
    baseUrl : '/bower_components/',
    paths : {
        'src': '../src',
        'underscore': 'underscore/underscore',
        'jquery': 'jquery/dist/jquery',
        'backbone': 'backbone/backbone',
        'backbone.babysitter': 'backbone.babysitter/lib/backbone.babysitter',
        'backbone.marionette': 'marionette/lib/backbone.marionette',
        'backbone.wreqr': 'backbone.wreqr/lib/backbone.wreqr',
    },
    shim : {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.marionette' : {
            deps: ['backbone', 'backbone.babysitter', 'backbone.wreqr'],
            exports: 'Marionette'
        }
    },
    waitSeconds: 0
});
