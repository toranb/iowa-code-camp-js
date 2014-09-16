var App, store;

module("speaker integration tests", {
    setup: function() {
        var first = {session: "foo", level: 100, desc: "first one", time: "9:00 AM - 10:15 AM", room: "Room A", speaker: {name: "toran", bio: "javascript ninja"}};
        var last = {session: "bar", level: 300, desc: "last one", time: "10:30 AM - 11:45 AM", room: "Room B", speaker: {name: "nick", bio: "rockstar hacker"}};
        var data = {"d":{"success":true,"message":null,"data":[first, last]}};
        stubEndpointForHttpRequest("http://iowacodecamp.com/data/json", data);
        App = startApp();
        store = lookup("store:main");
    },
    teardown: function() {
        $.mockjaxClear();
        Ember.run(App, "destroy");
    }
});

test("speakers route will show the list of available speakers", function() {
    expect(5);
    visit("/speakers");
    andThen(function() {
        var first_speaker = store.getEverything("speaker").toArray()[0];
        var last_speaker = store.getEverything("speaker").toArray()[1];
        var rows = find(".speaker-row").length;
        equal(rows, 2, rows);
        var first_name = find(".speaker-name:eq(0)").text();
        equal(first_name, "toran");
        var last_name = find(".speaker-name:eq(1)").text();
        equal(last_name, "nick");
        var first_link = find(".speaker-link:eq(0) a").attr("href");
        equal(first_link, "#");
        var last_link = find(".speaker-link:eq(1) a").attr("href");
        equal(last_link, "#");
    });
});

test("speaker details route will show the speaker details", function() {
    expect(5);
    visit("/speakers");
    click(".speaker-link :eq(0) a");
    andThen(function() {
        var first_session = store.getEverything("session").toArray()[0];
        var speaker_name = find(".speaker-name");
        equal(speaker_name.text(), "toran");
        var speaker_bio = find(".speaker-bio");
        equal(speaker_bio.text(), "javascript ninja");
        var sessions = find(".speaker-session-row").length;
        equal(sessions, 1);
        var first_session_name = find(".speaker-session-name:eq(0)");
        equal(first_session_name.text(), "foo");
        var first_session_link = find(".speaker-session-link:eq(0) a").attr("href");
        equal(first_session_link, "/sessions/%@".fmt(first_session.get("id")));
    });
});
