"use strict";

Ember.Handlebars.registerBoundHelper("add", function (val, valToAdd) {
    return $.isNumeric(val) ? parseInt(val, 10) + valToAdd : valToAdd;
});
