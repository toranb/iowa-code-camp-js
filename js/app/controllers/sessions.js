var SessionsController = Ember.ArrayController.extend({
    sortProperties: ["time"],
    everything: function() {
        var models = [];
        var store = this.get("store");
        this.get("model").forEach(function(item) {
            var time = item.get("time");
            var found = models.findBy("time", time);
            if(!found) {
                models.pushObject(Ember.Object.create({
                    time: time,
                    sessions: []
                }));
            }
            var speaker_id = item.get("speaker");
            var speaker = store.getById("speaker", speaker_id);
            item.set("speaker_name", speaker.get("name"));
            models.findBy("time", time).get("sessions").pushObject(item);
        });
        return models;
    }.property("model.@each")
});

export default SessionsController;
