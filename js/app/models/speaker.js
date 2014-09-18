export default Ember.Object.extend({
    imgUrl: function() {
        var img = this.get("img");
        return "http://iowacodecamp.com/public/images/speakers/" + img;
    }.property("img")
});
