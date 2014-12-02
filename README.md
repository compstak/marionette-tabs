# Marionette.TabbedBehavior

This is a Marionette behavior that adds tabbed UI funcitonality to a Merionette layout. You can make custom views for the tabs or use the defaults.

## Basic Usage

```javascript

define(function (require) {

	var Marionette = require('backbone.marionette');
	
	var TabbedBehavior = require('src/TabbedBehavior');
	var TabsCollection = require('src/TabsCollection');

	// This collection holds your tab objects
	var tabs = new TabsCollection();

	// each TabItem object must have an id, title, and a view that 
	// will be instantiated for the actual content of the tab.
	tabs.add({
		id: 'tab-one',
		title: 'First Tab',
		ContentView: Marionette.ItemView.extend({
			template: function () { return 'The content of the first tab!'; }
		}),
	});

	tabs.add({
		id: 'tab-two',
		title: 'Second Tab',
		ContentView: Marionette.ItemView.extend({
			template: function () { return 'The content of the second tab!'; }
		})
	});


	// TabbedBehavior is added to a Marionette layout.
	// There must be regions called 'tabs' and 'content'.
	return Marionette.Layout.extend({
		
		template: '#tab_layout',

		regions: {
			'tabs': '.tab-container',
			'content': '.content-container'
		},

		behaviors: {
			TabbedBehavior: {
				behaviorClass: TabbedBehavior,
				tabs: tabs
			}
		}
	});
});

```

## Options

```javascript
	return Marionette.Layout.extend({
		
		// your layout options, including the 'tabs' and 'content' regions.

		behaviors: {
			TabbedBehavior: {
				// required
				behaviorClass: TabbedBehavior, // the actual behavior
				tabs: tabs, // collection of tab objects

				// optional
				tabItemView: CustomItemView, // an item view that will be used for the tabs
				defaultTab: 'tabId', // the tab that will be selected on initial view.
			}
		}
	});

```
