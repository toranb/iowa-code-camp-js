export default Ember.Object.extend({
    imgUrl: Ember.computed("img", function() {
        return "http://iowacodecamp.com/public/images/speakers/" + this.img;
    })
});
