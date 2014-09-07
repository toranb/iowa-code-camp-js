var Router = Ember.Router.extend();

Router.map(function() {
    this.resource("sessions", {path: "/sessions"});
    this.resource("session", {path: "/sessions/:session_id"});
    this.resource("speakers", {path: "/speakers"});
    this.resource("speaker", {path: "/speakers/:speaker_id"});
});

export default Router;
