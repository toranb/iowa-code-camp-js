var Router = Ember.Router.extend();

Router.map(function() {
    this.resource("application", { path: "/" });
});

export default Router;
