define(function (require) {
    'use strict';

    var Marionette = require('backbone.marionette');
    var TabCollectionView = require('./TabCollectionView');

    return Marionette.Behavior.extend({
        
        initialize: function () {
            if (!this.view.tabs) {
                throw new Error('Tried to add TabbedBehavior to a layout without a "tabs" region.');
            }
            if (!this.view.content) {
                throw new Error('Tried to add TabbedBehavior to a layout without a "content" region.');
            }
            if (!this.options.tabs) {
                throw new Error('Tried to add TabbedBehavior to a layout wihtout providing a "tabs" collection.');
            }
            this.currentView = null;
        },

        defaults: {
            TabCollectionView: TabCollectionView
        },

        onRender: function () {

            var extendObject = {
                collection: this.options.tabs
            };

            if (this.options.tabItemView) {
                extendObject.itemView = this.options.tabItemView;
            }
            var tabsView = new this.options.TabCollectionView(extendObject);

            this.view.tabs.show(tabsView);
            var defaultTab;

            tabsView.children.forEach(function (childView) {
                childView.on('select', this.switchTabs.bind(this));
                if (childView.model.id === this.options.defaultTab) {
                    defaultTab = childView;
                }
            }.bind(this));

            if (!defaultTab) {
                defaultTab = tabsView.children.first();
            }

            this.switchTabs(defaultTab);
        },

        switchTabs: function (tabView) {

            var tab = this.options.tabs.findWhere({id: tabView.model.id});

            if (this.currentTab) {
                this.currentTab.$el.removeClass('selected');
            }
            this.currentTab = tabView;

            tabView.$el.addClass('selected');
            var newView = new (tab.get('ContentView'))();
            this.view.content.show(newView);
        }

    });
});
