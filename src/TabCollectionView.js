define(function (require) {
    'use strict';

    var Marionette = require('backbone.marionette');
    var TabItemView = require('./TabItemView');

    return Marionette.CollectionView.extend({
        
        tagName: 'ul',
        
        className: 'tab-item-view',

        itemView: TabItemView,

        itemEvents: {
            'select': function (eventName, itemView) {
                this.trigger('change', itemView);
            }
        }

    });
});
