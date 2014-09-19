var App, store;

module("speaker integration tests", {
    setup: function() {
        var first = {session: "foo", level: 100, desc: "first one", time: "9:00 AM - 10:15 AM", room: "Room A", speaker: {name: "toran", bio: "javascript ninja", location: "Burlington, IA", web: "http://toranbillups.com", img: "ToranBillups.jpg"}};
        var last = {session: "bar", level: 300, desc: "last one", time: "10:30 AM - 11:45 AM", room: "Room B", speaker: {name: "nick", bio: "rockstar hacker", location: "Des Moines, IA", web: "http://nickstarke.com", img: "NicholasStarke.jpg"}};
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
    expect(7);
    visit("/speakers");
    andThen(function() {
        var first_speaker = store.getEverything("speaker").toArray()[0];
        var last_speaker = store.getEverything("speaker").toArray()[1];
        var rows = find(".speaker-row").length;
        equal(rows, 2, rows);
        var first_name = find(".speaker-name:eq(0)").text();
        equal(first_name, "toran");
        var first_location = find(".speaker-location:eq(0)").text();
        equal(first_location, "Burlington, IA");
        var last_name = find(".speaker-name:eq(1)").text();
        equal(last_name, "nick");
        var last_location = find(".speaker-location:eq(1)").text();
        equal(last_location, "Des Moines, IA");
        var first_link = find(".speaker-link:eq(0) a").attr("href");
        equal(first_link, "#");
        var last_link = find(".speaker-link:eq(1) a").attr("href");
        equal(last_link, "#");
    });
});

test("speaker details route will show the speaker details", function() {
    expect(9);
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
        equal(first_session_link, "#");
        var speaker_img = find(".speaker-img:eq(0)");
        equal(speaker_img.attr("src"), "http://iowacodecamp.com/public/images/speakers/ToranBillups.jpg");
        var speaker_location = find(".speaker-location:eq(0)");
        equal(speaker_location.text(), "Burlington, IA");
        var speaker_web = find(".speaker-web a:eq(0)");
        equal(speaker_web.attr("href").trim(), "http://toranbillups.com");
        equal(speaker_web.text().trim(), "http://toranbillups.com");
    });
});
