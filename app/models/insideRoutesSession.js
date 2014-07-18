"use strict";

App.InsideRoutesSession = App.TrainingSession.extend({
    session_type_id: 0,
    inside_routes_sets: DS.hasMany("inside-routes-set"),
});

App.InsideRoutesSession.FIXTURES = [
    { id: 1, inside_routes_sets: [1, 2] }
];
