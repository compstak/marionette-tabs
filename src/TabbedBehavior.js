define(function (require) {
    'use strict';

    var Marionette = require('backbone.marionette');
    var TabCollectionView = require('./TabCollectionView');

    return Marionette.Behavior.extend({
        
        initialize: function (options) {
            this.tabs = this.view.tabsCollection;
            this.currentView = null;
        },

        onRender: function () {
            var tabsView = new TabCollectionView({
                collection: this.tabs, 
                onTabSelect: this.switchTabs.bind(this)
            });

            console.log(tabsView);
            tabsView.render();
            this.view.tabs.show(tabsView);
        },

        switchTabs: function (tabId) {
            console.log('hiiiiii!!');

            var tab = this.tabs.findWhere({id: tabId});
            window.tab = tab;

            this.currentView = new (tab.get('View'))();
            this.view.content.show(this.currentView);

        }

    });
});
