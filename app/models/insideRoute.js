"use strict";

App.InsideRoute = DS.Model.extend({
    grade: DS.attr("string"),
    comments: DS.attr("string"),
    next_route_id: DS.attr("number"),
    index: DS.attr("number"),
    transition: DS.attr("string", { default: "up->lower"}),
    transitionOptions: ["up->lower", "up->down", "up->down->up", "up->down->up->down"]
});

App.InsideRoute.FIXTURES = [
    { id: 1, grade: "12b", comments: "Hard, tired", index: 0, transition: "up->lower" },
    { id: 2, grade: "11b", comments: "", index: 1, transition: "up->down" },
    { id: 3, grade: "12a", comments: "", index: 2, transition: "up->down" },
    { id: 4, grade: "12c", comments: "", index: 3, transition: "up->lower" }
];
