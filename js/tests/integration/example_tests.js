var App;

module("integration tests", {
    setup: function() {
        App = startApp();
    },
    teardown: function() {
        $.mockjaxClear();
        Ember.run(App, "destroy");
    }
});

test("delete will remove the person for a given row", function() {
    expect(1);
    visit("/");
    andThen(function() {
        equal(1, 2, "example to show a failing test in the first commit");
    });
});
