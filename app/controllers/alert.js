"use strict";

App.AlertController = Ember.ObjectController.extend({
    // Properties
    displayTime: 3000,
    fadeInTime: 800,
    fadeOutTime: 800,
    scrollToAlert: true,

    alertType: null,
    alertTitle: null,
    alertDescription: null,
    alertHidden: true,

    alertClass: function () {
        if (!this.get("alertType")) return "";

        switch (this.get("alertType")) {

        case "error":
            return "alert-danger";
        case "info":
            return "alert-info";
        case "success":
            return "alert-success";
        default:
            return "alert-warning";
        }
    }.property("alertType"),

    alertEl: function () {
        var alertEl = $("div .alert");
        return alertEl.length ? alertEl : null;
    }.property("alertType", "alertHidden"),

    // Actions
    actions: {
        dismissAlert: function () {
            this.clearAlert();
        }
    },

    // Methods
    setAlert: function (type, titleAndDescriptionObject) {
        titleAndDescriptionObject = titleAndDescriptionObject || {};

        this.setProperties({
            alertType: type,
            alertTitle: titleAndDescriptionObject.title || "",
            alertDescription: titleAndDescriptionObject.description || "",
            alertHidden: false
        });
    },
    setAlertError: function (obj) { this.setAlert("error", obj); },
    setAlertSuccess: function (obj) { this.setAlert("success", obj); },
    setAlertInfo: function (obj) { this.setAlert("info", obj); },

    clearAlert: function () {
        this.setProperties({
            alertType: null,
            alertTitle: null,
            alertDescription: null,
            alertHidden: true
        });
    },
    showAlert: function (type, titleAndDescriptionObject) {
        this.setAlert(type, titleAndDescriptionObject);

        if (this.get("alertEl")) {
            if (this.get("scrollToAlert")) {
                App.scrollWindow();
            }
            this.get("alertEl").fadeIn(this.get("fadeInTime"), "linear");
        }
    },
    hideAlert: function () {
        if (this.get("alertEl")) {
            this.get("alertEl").fadeOut(this.get("fadeOutTime"));
        }
        Ember.run.later(this, this.clearAlert, this.get("fadeOutTime"));
    },
    alertThenDismiss: function (type, titleAndDescriptionObject) {
        this.showAlert(type, titleAndDescriptionObject);
        Ember.run.later(this, this.hideAlert, this.get("displayTime") + this.get("fadeInTime"));
    }
});
