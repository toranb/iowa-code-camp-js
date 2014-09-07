var SessionsRoute = Ember.Route.extend({
    model: function() {
        return this.store.getEverything("session");
    }
});

export default SessionsRoute;
