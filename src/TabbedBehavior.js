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
            tabCollectionView: TabCollectionView
        },

        onRender: function () {

            var self = this;

            var extendObject = {
                collection: this.options.tabs
            };

            if (this.options.tabItemView) {
                extendObject.itemView = this.options.tabItemView;
            }
            var tabsView = new this.options.tabCollectionView(extendObject);

            this.view.tabs.show(tabsView);

            tabsView.on('change', function (tabView) {
                self.switchTabs(tabView);
            });

            var defaultTab;
            
            if (this.options.defaultTab) {
                tabsView.children.forEach(function (childView) {
                    if (childView.model.id === self.options.defaultTab) {
                        defaultTab = childView;
                    }
                });
            }
            if (!defaultTab) {
                defaultTab = tabsView.children.first();
            }

            if (defaultTab) {
                this.switchTabs(defaultTab);
            } else {
                this.listenToOnce(this.options.tabs, 'add', function () {
                    this.switchTabs(tabsView.children.first());
                }.bind(this));
            }
        },

        switchTabs: function (tabView) {

            var tab = this.options.tabs.findWhere({id: tabView.model.id});

            if (this.currentTab) {
                this.currentTab.$el.removeClass('selected');
            }
            this.currentTab = tabView;

            var options;
            if (this.options.getOptions) {
                options = this.options.getOptions(tabView.model);
            } else if (this.options.options) {
                options = this.options.options;
            }

            tabView.$el.addClass('selected');
            var newView = new (tab.get('ContentView'))(options);
            this.view.content.show(newView);
        }

    });
});
