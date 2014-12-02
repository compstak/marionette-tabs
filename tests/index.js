define(function (require) {

    var Marionette = require('backbone.marionette');
    
    var TabbedBehavior = require('src/TabbedBehavior');
    var TabsCollection = require('src/TabsCollection');

    var tabs = new TabsCollection();

    tabs.add({
        id: 'one',
        title: 'one',
        ContentView: Marionette.ItemView.extend({
            template: function () { return 'one!'; }
        }),
    });

    tabs.add({
        id: 'two',
        title: 'two',
        ContentView: Marionette.ItemView.extend({
            template: function () { return 'two!'; }
        })
    });

    var layout = new (Marionette.Layout.extend({
        
        template: '#tab_layout',

        regions: {
            'tabs': '.tab-container',
            'content': '.content-container'
        },

        behaviors: {
            TabbedBehavior: {
                behaviorClass: TabbedBehavior,
                tabs: tabs,
                defaultTab: 'two',
                //tabItemView: DefaultItemView.extend({template: function (model) { return '<i>' + model.title + '</i>'; }})
            }
        }
    }))();
    
    layout.render();

    $('#content_area').append(layout.$el);
});
