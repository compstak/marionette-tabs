define(function (require) {
    'use strict';

    var Backbone = require('backbone');
    var Marionette = require('backbone.marionette');
    
    var TabItem = require('src/TabItem');
    var TabbedBehavior = require('src/TabbedBehavior');

    var tabsCollection = new Backbone.Collection();

    var DefaultItemView = require('src/TabItemView');

    tabsCollection.add(new TabItem({
        id: 'one',
        title: 'one',
        url: '/one',
        View: Marionette.ItemView.extend({
            tagName: 'fart',
            template: function () { return 'one!'; }
        }),
    }));

    tabsCollection.add(new TabItem({
        id: 'two',
        title: 'two',
        url: '/two',
        View: Marionette.ItemView.extend({
            tagName: 'fart',
            template: function () { return 'two!'; }
        })
    }));

    var layout = new (Marionette.Layout.extend({
        
        template: '#tab_layout',

        regions: {
            'tabs': '.tab-container',
            'content': '.content-container'
        },

        tabsCollection: tabsCollection,

        behaviors: {
            TabbedBehavior: {
                behaviorClass: TabbedBehavior,
                defaultTab: 'two'
                //itemView: DefaultItemView.extend({template: function (model) { return '<i>' + model.title + '</i>'; }})
            }
        }
    }))();
    
    layout.render();

    $('#content_area').append(layout.$el);
});
