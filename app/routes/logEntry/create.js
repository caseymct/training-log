"use strict";

App.LogEntryCreateRoute = Ember.Route.extend(
    // Mixins
    App.LogEntryChangeTemplateMixin,

    {
        // Actions
        actions: {
            willTransition: function () {
                this.controllerFor("logEntryEdit").reset();
            }
        },

        // Hooks
        model: function () {
            return this.store.createRecord("log-entry");
        },

        setupController: function (controller, model) {
            this.controllerFor("logEntryEdit").setup(model, true);
        },

        renderTemplate: function () {
            this.render("logEntry/edit", { controller: "logEntryEdit" });
            this.render("sessionTypes/insideRoutesSession", {
                    into: "logEntry/edit",
                    outlet: "sessionTypeChanged",
                    controller: "insideRoutesSession"
                });
        }
    }
);
