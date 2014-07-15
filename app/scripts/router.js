"use strict";

require("scripts/routes/application");

App.Router.map(function () {
    // User App
    this.route("login");
    this.route("forgotPassword", { path: "/forgot-password" });
    this.route("resetPassword", { path: "/reset-password/:uid/:token" });
    this.route("changePassword", { path: "/change-password" });
    this.route("logout");

    this.resource(
        "entries",
        { path: "entries" },
        function () {
            this.resource("entry",
            { path: "entry"},
            function () {
                this.route("create");
                this.route("edit", {path: "/:entry_id" });
            });
            this.route("view");
        }
    );
});
