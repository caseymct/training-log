"use strict";

require("app/routes/application");
require("app/routes/mixins/logEntryChangeTemplate");
require("app/routes/logEntry/create");

App.Router.map(function () {
    // User App
    this.route("login");
    this.route("forgotPassword", { path: "/forgot-password" });
    this.route("resetPassword", { path: "/reset-password/:uid/:token" });
    this.route("changePassword", { path: "/change-password" });
    this.route("logout");

    this.resource(
        "logEntries",
        { path: "logEntries" },
        function () {
            this.resource("logEntry",
            { path: "logEntry"},
            function () {
                this.route("create");
                this.route("edit", { path: "/:entry_id" });
            });
            this.route("view");
        }
    );
});
