# Marionette.Tabs

This is a Marionette behavior that adds tabbed UI funcitonality to a Marionette layout. It has defaults to create a simple tabbed layout, but you may create custom views and objects for more advanced usage.

Marionette-tabs provides five classes.

- `Tab.Behavior` - the behavior can be applied to any layout with regions called 'tabs' and 'content' to create a tabbed UI.
- `Tab.Collection` - a simple collection of TabItems.
- `Tab.ItemView` - this may be extended to change the appearance of the tabs.
- `Tab.CollectionView` - this may be extended to change the appearance of the tab bar.
- `Tab.TabItem` - this model that throw errors if required properties are missing.

For the most basic usage you will only need to create a `Tabs.Collection` for your tabs and add `Tabs.Behavior` to your layout.

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
	// add more tabs

	// This is the layout that you create.
	return Marionette.Layout.extend({
		
		template: '#tab_layout',

		// Your layout must have regions called 'tabs' and 'layout'
		// Other regions will be ignored.
		regions: {
			'tabs': '.tab-container',
			'content': '.content-container'
		},

		// Add the behavior to the layout.
		behaviors: {
			TabBehavior: {
				behaviorClass: Tab.Behavior,
				tabs: Tabs
			}
		}
	});
});

```

## Tab Models

A tab model is a Backbone model that will be used to identify and render the tab. It must have an id, title, and a ContentView. These are added to a collection that is passed to the behavior.

- `id` - a string identifier of the tab.
- `title` - a string that will be used to label the tab in the UI.
- `ContentView` - a Marionette view that will be used to render the content of this tab. It can be an ItemView, CollectionView, LayoutView, or anything else that Marionette can render in a region of a layout.

## Options

All options go on the behavior.

Required:

- `behaviorClass` - this will always be `Tab.Behavior`.
- `tabs` - this should be an instance of `Tab.Collection`. It is the colleciton of tab models.

Optional:

- `tabItemView` - this is a view that will be used to render the tabs.
- `tabCollectionView` - this is a collection view that will be used to render the tab bar.
- `defaultTab` - a string that should correspond to the id property of a tab model.  By default first tab will be used.
- `getOptions` - a function that returns an object to be used as options for the content views.
- `option` - if getOptions is not set, this object will be used instead.

Example with all options:

```javascript

	TabBehavior: {
		// required
		behaviorClass: Tab.Behavior, // the actual behavior
		tabs: tabs, // collection of tab objects

		// optional
		tabItemView: CustomItemView, // a view that will be used for the tabs.
		tabCollectionView: CustomCollectionView, // a collection view that will be used to render the tabs.
		defaultTab: 'tabId', // the tab that will be selected on initial view.
		options: { model: thingy }, // options that will be passed to the content views.
		getOptions: function (model) { return { id: model.get('id') }; }, // a function that will be called just before the view is created to get the options.
	}

```
