define(function (require) {
    'use strict';

    var Backbone = require('backbone');
    var TabItem = require('./TabItem');

    return Backbone.Collection.extend({
        model: TabItem
    });
});
