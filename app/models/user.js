"use strict";

App.User = DS.Model.extend({
    first_name: DS.attr("string"),
    last_name: DS.attr("string")
});

App.User.FIXTURES = [
    { id: 1, first_name: "Casey", last_name: "McTaggart" }
];
