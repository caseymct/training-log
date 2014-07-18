"use strict";

App.SessionType = Ember.Object.extend({
    id: 0,
    name: "",

    templateName: function () {
        return this.get("name")
            .replace(/(?:\s)\w/g, function(m) {
                return m.toUpperCase();
            })
            .replace(/\s/,"")
            + "Session";
    }.property("name")
});
