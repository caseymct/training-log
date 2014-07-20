"use strict";

App.InsideRoutesSessionController = Ember.ArrayController.extend({
    model: [],
    routeGrades: [],
    insideRoutesSet: [],
    userId: 1,

    initialize: function () {
        this.setup();
    }.on("init"),

    setup: function () {
        this.store.find("inside-routes-set")
            .then(function (insideRoutesSet) {
                this.set("model", insideRoutesSet);
            }.bind(this)
        );
    },
    addSet: function () {
        Ember.RSVP.allSettled([
            this.store.createRecord("inside-routes-set"),
            this.store.createRecord("inside-route")
        ]).then(function (responses) {
            return {
                routeSet: responses[0].value,
                route: responses[1].value
            };
        }.bind(this))
        .then(function (hash) {
            hash.routeSet.get("routes").then(function (routes) {
                routes.addObject(hash.route);
            }.bind(this));
        }.bind(this));
    },

    addRouteToSet: function (routeSet) {
        routeSet.get("routes").then(function (routes) {
            routes.addObject(this.store.createRecord("inside-route"));
        }.bind(this));
    },
    removeRouteFromSet: function (routeSet) {
        this.
        routeSet.get("routes").then(function (routes) {
            routes.addObject(this.store.createRecord("inside-route"));
        }.bind(this));
    },
    actions : {
        addSet: function () { this.addSet(); },
        addRouteToSet: function (routeSet) { this.addRouteToSet(routeSet); },
        removeRouteFromSet: function (routeSet) { this.removeRouteFromSet(routeSet); },
    }
});
