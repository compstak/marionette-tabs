define(function (require) {
    'use strict';

    var Marionette = require('backbone.marionette');
    var TabItemView = require('./TabItemView');

    return Marionette.CollectionView.extend({
        
        tagName: 'ul',
        
        className: 'tab_item_view',

        itemView: TabItemView,

        events: {
            'click a[data-id]': function (event) {
                event.preventDefault();
                var id = event.target.getAttribute('data-id');
                this.options.onTabSelect(id);
            }
        }

    });
});
