document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
startApp = require('js/helpers/start-app')['default'];

function stubEndpointForHttpRequest(url, json, verb, status) {
    $.fauxjax.new({
        type: verb || "GET",
        url: url,
        status: status || 200,
        dataType: 'json',
        responseText: json
    });
}

$.fauxjax.settings.responseTime = 0;

require('js/helpers/start-app');

Ember.keys(requirejs._eak_seen).filter(function(key) {
    return (/integration/).test(key);
}).forEach(function(moduleName) {
    require(moduleName, null, null, true);
});
