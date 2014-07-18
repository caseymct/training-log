"use strict";

App.InsideRoutesSessionController = Ember.ArrayController.extend({
    model: [],

    initialize: function () {
        this.setup();
    }.on("init"),

    routeSets: function () {
        return this.get("model") || [];
    }.property("model"),

    setup: function () {
        this.store.find("inside-routes-set")
            .then(function (insideRoutesSet) {
                this.set("model", insideRoutesSet);
            }.bind(this)
        );
    }
});
