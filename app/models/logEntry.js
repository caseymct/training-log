"use strict";

App.LogEntry = DS.Model.extend({
    // Properties
    training_session: DS.belongsTo("training-session"),
    date: DS.attr("date"),

    date_short: function () {
        var format = "DD/MM/YYYY";
        debugger;
        return this.get("date").format(format);
    }
});
