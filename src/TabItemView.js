define(function (require) {
    'use strict';

    var template = require('hbs!./tabItemTemplate');
    var Marionette = require('backbone.marionette');

    return Marionette.ItemView.extend({
        template: template,
        tagName: 'li'
    });
});
