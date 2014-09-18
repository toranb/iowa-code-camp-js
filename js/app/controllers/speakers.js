var SpeakersController = Ember.ArrayController.extend({
    speakers: function() {
        return this.get("content").filter(function(speaker) {
            return speaker.get("name") !== "Iowa Code Camp";
        });
    }.property("content.@each")
});

export default SpeakersController;
