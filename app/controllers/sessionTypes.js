"use strict";

App.SessionTypesController = Ember.ArrayController.extend({
    model: null,

    initModel: function () {
        this.set("model", [].addObjects([
            App.SessionType.create({ id: 0, name: "inside routes" }),
            App.SessionType.create({ id: 1, name: "outside routes" }),
            App.SessionType.create({ id: 2, name: "inside boulders" }),
            App.SessionType.create({ id: 3, name: "outside boulders" }),
            App.SessionType.create({ id: 4, name: "campus" }),
            App.SessionType.create({ id: 4, name: "fingerboard" }),
            App.SessionType.create({ id: 4, name: "strength" }),
            App.SessionType.create({ id: 4, name: "recovery" })
        ]));
    }.on("init")
})