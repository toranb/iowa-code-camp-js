var SpeakerRoute = Ember.Route.extend({
    model: function(params) {
        var speaker = this.store.getById("speaker", params.speaker_id);
        var sessions = this.store.filterEverything("session", "speaker", speaker.id);
        return Ember.RSVP.hash({speaker: speaker, sessions: sessions});
    },
    setupController: function(controller, hash) {
        controller.set("model", hash.speaker);
        controller.set("sessions", hash.sessions);
    }
});

export default SpeakerRoute;
