define(function (require) {
    'use strict';

    var Marionette = require('backbone.marionette');
    var TabItemView = require('./TabItemView');

    return Marionette.CollectionView.extend({

        tagName: 'ul',

        className: 'tab-item-view',

        childView: TabItemView,

        childEvents: {
            'select': function (eventName, itemView) {
                this.trigger('change', itemView);
            }
        }

    });
});
