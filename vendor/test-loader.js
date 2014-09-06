document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
startApp = require('js/helpers/start-app')['default'];

function stubEndpointForHttpRequest(url, json, verb, status) {
    $.mockjax({
        type: verb || "GET",
        url: url,
        status: status || 200,
        dataType: 'json',
        responseText: json
    });
}

$.mockjaxSettings.logging = false;
$.mockjaxSettings.responseTime = 0;

require('js/helpers/start-app');

Ember.keys(requirejs._eak_seen).filter(function(key) {
    return (/integration/).test(key);
}).forEach(function(moduleName) {
    require(moduleName, null, null, true);
});
