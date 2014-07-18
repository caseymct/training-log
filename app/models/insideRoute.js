"use strict";

App.InsideRoute = DS.Model.extend({
    grade: DS.attr("string"),
    comments: DS.attr("string"),
    next_route_id: DS.attr("number"),
    index: DS.attr("number"),
    transition: DS.attr("string", { default: "---"}),

    transitionOptions: function () {
        var ops = ["up", "up then lower off"];
        if ((this.get("index") % 2) === 1) {
            ops = ops.concat("downclimb");
        }
        return ops.concat("---");
    }.property("index")
});

App.InsideRoute.FIXTURES = [
    { id: 1, grade: "5.12b", comments: "Hard, tired", index: 0, transition: "up then lower off" },
    { id: 2, grade: "5.11b", comments: "", index: 1, transition: "downclimb" },
    { id: 3, grade: "5.12a", comments: "", index: 2, transition: "up" },
    { id: 4, grade: "5.12c", comments: "", index: 3, transition: "up then lower off" }
];
