define(function (require) {
    'use strict';

    var Marionette = require('backbone.marionette');
    var TabCollectionView = require('./TabCollectionView');

    return Marionette.Behavior.extend({
        
        initialize: function () {
            this.tabs = this.view.tabsCollection;
            this.currentView = null;
        },

        defaults: {
            TabCollectionView: TabCollectionView
        },

        onRender: function () {

            var extendObject = {
                collection: this.tabs
            };

            if (this.options.itemView) {
                extendObject.itemView = this.options.itemView;
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

            var tab = this.tabs.findWhere({id: tabView.model.id});

            if (this.currentTab) {
                this.currentTab.$el.removeClass('selected');
            }
            this.currentTab = tabView;

            tabView.$el.addClass('selected');
            var newView = new (tab.get('View'))();
            this.view.content.show(newView);
        }

    });
});
