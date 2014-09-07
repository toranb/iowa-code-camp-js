var SpeakersRoute = Ember.Route.extend({
    model: function() {
        return this.store.getEverything("speaker");
    }
});

export default SpeakersRoute;
