# Marionette.TabbedBehavior

This is a Marionette behavior that adds tabbed UI funcitonality to a Merionette layout. You can make custom views for the tabs or use the defaults.

## Basic Usage

```javascript

define(function (require) {

	var Marionette = require('backbone.marionette');
	
	var Tab = require('marionette-tabs/index');

	// This collection holds your tab objects
	var tabs = new Tab.Collection();

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
			TabBehavior: {
				behaviorClass: Tab.Behavior,
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
			TabBehavior: {
				// required
				behaviorClass: Tab.Behavior, // the actual behavior
				tabs: tabs, // collection of tab objects

				// optional
				tabItemView: CustomItemView, // a view that will be used for the tabs
				defaultTab: 'tabId', // the tab that will be selected on initial view.
				options: { model: thingy }, // options that will be passed to the content views
				getOptions: function () { return { model: thingy }; }, // a function that will be called just before the view is created to get the options.
			}
		}
	});

```
