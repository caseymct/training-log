"use strict";

App.LogEntryChangeTemplateMixin = Ember.Mixin.create({

    // Actions
    actions: {
        changeTemplate: function (sessionType) {
            this.render("sessionTypes/" + sessionType.get("templateName"), {
                into: "logEntry/edit",
                outlet: "sessionTypeChanged",
                controller: "insideRouteSession"
            });
        }
    }
});
