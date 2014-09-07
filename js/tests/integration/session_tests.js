var App, store;

module("session integration tests", {
    setup: function() {
        var first = {session: "foo", desc: "first one", speaker: {name: "toran"}};
        var last = {session: "bar", desc: "last one", speaker: {name: "nick"}};
        stubEndpointForHttpRequest("http://iowacodecamp.com/data/json", [first, last]);
        App = startApp();
        store = lookup("store:main");
    },
    teardown: function() {
        $.mockjaxClear();
        Ember.run(App, "destroy");
    }
});

test("sessions route will show the list of available sessions", function() {
    expect(5);
    visit("/");
    andThen(function() {
        var first_session = store.getEverything("session").toArray()[0];
        var last_session = store.getEverything("session").toArray()[1];
        var rows = find(".session-row").length;
        equal(rows, 2, rows);
        var first_name = find(".session-name:eq(0)").text();
        equal(first_name, "foo");
        var last_name = find(".session-name:eq(1)").text();
        equal(last_name, "bar");
        var first_link = find(".session-link:eq(0) a").attr("href");
        equal(first_link, "/sessions/%@".fmt(first_session.get("id")));
        var last_link = find(".session-link:eq(1) a").attr("href");
        equal(last_link, "/sessions/%@".fmt(last_session.get("id")));
    });
});

test("session details route will show the session details", function() {
    expect(5);
    visit("/");
    click(".session-link:eq(0) a");
    andThen(function() {
        var first_speaker = store.getEverything("speaker").toArray()[0];
        var session_name = find(".session-name");
        equal(session_name.text(), "foo");
        var session_desc = find(".session-desc");
        equal(session_desc.text(), "first one");
        var speakers = find(".session-speaker-row").length;
        equal(speakers, 1);
        var first_speaker_name = find(".session-speaker-name:eq(0)");
        equal(first_speaker_name.text(), "toran");
        var first_speaker_link = find(".session-speaker-link:eq(0) a").attr("href");
        equal(first_speaker_link, "/speakers/%@".fmt(first_speaker.get("id")));
    });
});
