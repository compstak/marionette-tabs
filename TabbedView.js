define(function (require) {
    'use strict';

    var Marionette = require('backbone.marionette');
    var TabItemView = require('./src/TabItemView');

    return Marionette.CompositeView.extend({
        
        tagName: 'ul',
        
        className: 'tab_item_view',

        itemView: TabItemView,

        events: {
            'click a': function (event) {
                event.preventDefault();
                this.options.onclick(event);
            }
        }

    });
});
