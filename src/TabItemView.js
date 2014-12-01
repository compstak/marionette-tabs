define(function (require) {
    'use strict';

    var Marionette = require('backbone.marionette');

    return Marionette.ItemView.extend({
        template: function (model) {
            return '<a href="' + model.url + '">' + model.title + '</a>';
        },
        tagName: 'li'
    });
});
