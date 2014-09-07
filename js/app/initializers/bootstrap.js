var promise = function(url, type, hash) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
        hash.success = function(json) {
            return Ember.run(null, resolve, json);
        };
        hash.error = function(json) {
            if (json && json.then) {
                json.then = null;
            }
            return Ember.run(null, reject, json);
        };
        $.ajax(hash);
    });
};

var xhr = function(url, type, hash) {
    hash = hash || {};
    hash.url = url;
    hash.type = type;
    hash.cache = false;
    hash.dataType = "json";
    return promise(url, type, hash);
};

var initializer = {
    name: "bootstrap",
    after: "store",
    initialize: function(container, application) {
        application.deferReadiness();
        var store = container.lookup("store:main");
        var days = xhr("http://iowacodecamp.com/data/json", "GET").then(function(response) {
            response.forEach(function(data) {
                var session_id = Ember.uuid();
                var speaker_id = Ember.uuid();
                var session = {id: session_id, name: data.session, desc: data.desc, speaker: speaker_id};
                var speaker = {id: speaker_id, name: data.speaker.name, session: session_id};
                store.push("session", session);
                store.push("speaker", speaker);
            });
            application.advanceReadiness();
        }, function(error) {
            window.alert("an error occurred loading the app");
        });
    }
};

export default initializer;