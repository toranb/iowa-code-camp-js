var SessionRoute = Ember.Route.extend({
    model: function(params) {
        var session = this.store.getById("session", params.session_id);
        var speakers = this.store.filterEverything("speaker", "session", session.id);
        return Ember.RSVP.hash({session: session, speakers: speakers});
    },
    setupController: function(controller, hash) {
        controller.set("model", hash.session);
        controller.set("speakers", hash.speakers);
    }
});

export default SessionRoute;
