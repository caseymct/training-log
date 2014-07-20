"use strict";

App.RouteGrade = Ember.Object.extend({
    grade: ""
});

App.AllRouteGrades = [
    App.RouteGrade.create({"grade": "8"}),
    App.RouteGrade.create({"grade": "9"})
];

for(var i = 10; i <= 15; i++) {
    App.AllRouteGrades.addObjects([
        App.RouteGrade.create({"grade": i + "a"}),
        App.RouteGrade.create({"grade": i + "b"}),
        App.RouteGrade.create({"grade": i + "c"}),
        App.RouteGrade.create({"grade": i + "d"})
    ]);
}
