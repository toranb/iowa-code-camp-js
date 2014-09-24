var App, store;

module("session integration tests", {
    setup: function() {
        var first = {session: "foo", level: 100, desc: "first one", time: "9:00 AM - 10:15 AM", room: "Room A", speaker: {name: "toran", bio: "javascript ninja", location: "Burlington, IA"}};
        var last = {session: "bar", level: 300, desc: "last one", time: "10:30 AM - 11:45 AM", room: "Room B", speaker: {name: "nick", bio: "rockstar hacker", location: "Des Moines, IA"}};
        var data = {"d":{"success":true,"message":null,"data":[first, last]}};
        stubEndpointForHttpRequest("http://iowacodecamp.com/data/json", data);
        App = startApp();
        store = lookup("store:main");
    },
    teardown: function() {
        $.fauxjax.clear();
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
        equal(first_link, "#");
        var last_link = find(".session-link:eq(1) a").attr("href");
        equal(last_link, "#");
    });
});

test("session details route will show the session details", function() {
    expect(8);
    visit("/");
    click(".session-link:eq(0) a");
    andThen(function() {
        var first_speaker = store.getEverything("speaker").toArray()[0];
        var session_name = find(".session-name");
        equal(session_name.text(), "foo");
        var session_desc = find(".session-desc");
        equal(session_desc.text(), "first one");
        var session_time = find(".session-time");
        equal(session_time.text(), "9:00 AM - 10:15 AM");
        var session_room = find(".session-room");
        equal(session_room.text(), "Room A");
        var session_level = find(".session-level");
        equal(session_level.text(), "100");
        var speakers = find(".session-speaker-row").length;
        equal(speakers, 1);
        var first_speaker_name = find(".session-speaker-name:eq(0)");
        equal(first_speaker_name.text(), "toran");
        var first_speaker_link = find(".session-speaker-link:eq(0) a").attr("href");
        equal(first_speaker_link, "#");
    });
});

test("sessions will be sorted and grouped by listing time", function() {
    expect(3);
    visit("/");
    andThen(function() {
        var rows = find(".group-time").length;
        equal(rows, 2, rows);
        var first_time = find(".group-time:eq(0)").text();
        equal(first_time, "9:00 AM - 10:15 AM");
        var last_time = find(".group-time:eq(1)").text();
        equal(last_time, "10:30 AM - 11:45 AM");
    });
});
