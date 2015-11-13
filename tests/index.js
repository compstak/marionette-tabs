define(function (require) {

    var Marionette = require('backbone.marionette');

    var Tabs = require('src/index');

    var tabs = new Tabs.Collection();

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

    var layout = new (Marionette.LayoutView.extend({

        template: '#tab_layout',

        regions: {
            'tabs': '.tab-container',
            'content': '.content-container'
        },

        behaviors: {
            TabBehavior: {
                behaviorClass: Tabs.Behavior,
                tabs: tabs,
                defaultTab: 'two',
                // tabItemView: Tabs.ItemView.extend({template: function (model) { return '<i>' + model.title + '</i>'; }})
            }
        }
    }))();

    layout.render();

    $('#content_area').append(layout.$el);
});
