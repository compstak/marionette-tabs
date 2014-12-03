define(function (require) {
    return {
        Behavior: require('./TabbedBehavior'),
        Item: require('./TabItem'),
        ItemView: require('./TabItemView'),
        Collection: require('./TabsCollection'),
        CollectionView: require('./TabCollectionView')
    };
});
