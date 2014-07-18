"use strict";

App.InsideRoutesSet = DS.Model.extend({
    routes: DS.hasMany("inside-route", {async: true}),
    user: DS.belongsTo("user")
});

App.InsideRoutesSet.FIXTURES = [
    { id: 0, user: 1, routes: [1, 2]},
    { id: 1, user: 1, routes: [3, 4]}
];
