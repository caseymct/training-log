"use strict";

App.LogEntryEditController = Ember.ObjectController.extend(
    // App.NeedsDefaultControllerMixin,
    App.CreateAndEdit,

    {
        needs: ["alert", "sessionTypes"],

        // Properties
        alert: Ember.computed.alias("controllers.alert"),
        sessionTypes: Ember.computed.alias("controllers.sessionTypes"),

        selectedSessionType: null,


        sessionTypeChanged: function () {
            this.send("changeTemplate", this.get("selectedSessionType"));
        }.observes("selectedSessionType"),

        // Actions
        actions: {
            save: function () { this.saveEntry(); },
            discard: function () { this.discardChanges(); },
        },

        // Methods
        reset: function () {
            this._super();
            this.resetFlagAndModel();
        },
        discardChanges: function () {
            if (!this.get("isNew")) {
                this.get("model").rollback();
            }
        },

        saveEntry: function () {
            // this.set("model.merchant", this.get("selectedMerchant"));
            // this.set("model.rewards_category", this.get("selectedRewardCategory"));

            this.get("model")
                .save()
                .then(
                    function () {
                        this.set("isNew", false);
                        this.get("alert").alertThenDismiss("success", {
                            title: "Success!",
                            description: "Reward has been saved."
                        });
                        this.transitionToRoute("adminRewards.index");
                    }.bind(this),
                    function () {
                        this.get("alert").alertThenDismiss("error", {
                            title: "Could not save reward!",
                            description: "There was an error saving the reward."
                        });
                    }.bind(this)
                );
        },

        setup: function (logEntry, isNew) {
            this.setProperties({
                model: logEntry,
                isNew: isNew
            });

            // Ember.RSVP
            //     .allSettled([
            //         this.store.find("inside-route")
            //     ])
            //     .then(function (responses) {
            //         debugger;
            //         return {
            //             insideRouteSet: responses[0].value || null,
            //         };
            //     }.bind(this))
            //     .then(function (hash) {
            //         this.setProperties({
            //             insideRouteSet: hash.insideRouteSet,
            //         });
            //     }.bind(this));

            // this.get("alert").clearAlert();
        }
    }
);
