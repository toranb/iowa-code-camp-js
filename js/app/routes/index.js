var IndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo("sessions");
    }
});

export default IndexRoute;
