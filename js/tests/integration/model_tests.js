import SpeakerModel from "js/models/speaker";

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
