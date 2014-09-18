import SpeakersController from "js/controllers/speakers";
import SpeakerModel from "js/models/speaker";

var speakers = Ember.A([]);
var first = Ember.Object.create({name: "toran", bio: "javascript ninja", location: "Burlington, IA", img: "ToranBillups.jpg"});
var middle = Ember.Object.create({name: "Iowa Code Camp", bio: "", location: "", img: ""});
var last = Ember.Object.create({name: "nick", bio: "rockstar hacker", location: "Des Moines, IA", img: "NicholasStarke.jpg"});
speakers.pushObject(first);
speakers.pushObject(middle);
speakers.pushObject(last);

test("should not show the speaker with name iowa code camp", function() {
    var controller = new SpeakersController();
    controller.set("content", speakers);
    var result = controller.get("speakers");
    equal(result.get("length"), 2);
    equal(result.objectAt(0).get("name"), "toran");
    equal(result.objectAt(1).get("name"), "nick");
});

test("should update the computed property when a speaker is modified", function() {
    var controller = new SpeakersController();
    controller.set("content", speakers);
    var result = controller.get("speakers");
    equal(result.get("length"), 2);
    var another = Ember.Object.create({name: "another", bio: "wat", location: "foobar"});
    controller.get("content").pushObject(another);
    result = controller.get("speakers");
    equal(result.get("length"), 3);
});

test("should build the proper url for loading an image", function() {
    var firstModel = SpeakerModel.create(first);
    equal(firstModel.get("imgUrl"), "http://iowacodecamp.com/public/images/speakers/" + first.img);
    var lastModel = SpeakerModel.create(last);
    equal(lastModel.get("imgUrl"), "http://iowacodecamp.com/public/images/speakers/" + last.img);
});

test("should change url when img property is changed", function() {
    var model = SpeakerModel.create(first);
    var result = model.get("imgUrl");
    equal(result, "http://iowacodecamp.com/public/images/speakers/" + first.img);
    model.set("img", "BigBoss.jpg");
    result = model.get("imgUrl");
    equal(result, "http://iowacodecamp.com/public/images/speakers/BigBoss.jpg");
});
