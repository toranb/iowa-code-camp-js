import Store from "js/store";

var initializer = {
  name: "store",
  initialize: function(container, application) {
        application.register("store:main", Store);
        application.inject("controller", "store", "store:main");
        application.inject("route", "store", "store:main");
  }
};

export default initializer;
