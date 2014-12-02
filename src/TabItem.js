define(function (require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        initialize: function (options) {
            if (!_.isString(options.id)) {
                throw new Error('TabItem id must be a string. It is a ' + typeof options.id);
            }

            if (!_.isString(options.title)) {
                throw new Error('TabItem title of the tab with id "' + options.id + '" is not a string. It is a ' + typeof options.title);
            }

            if (!options.ContentView && !options.ContentView.render) {
                throw new Error('TabItem ContentView of the tab with id "' + options.id + '" does not have a render function');
            }

            return Backbone.Model.prototype.initialize.call(this, options);
        }
    });
});
