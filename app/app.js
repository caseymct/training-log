"use strict";

require("dependencies/scripts/jquery-1.9.1");
require("dependencies/scripts/jquery.cookie");
require("dependencies/scripts/jquery.form");
require("dependencies/scripts/jquery.jsoneditor");
require("dependencies/scripts/jquery-ui-1.10.3.custom");
require("dependencies/scripts/handlebars.runtime");
require("dependencies/scripts/ember");
require("dependencies/scripts/ember-data");
require("dependencies/scripts/raphael-2.1.0");
require("dependencies/scripts/simplechart");
require("dependencies/scripts/store");
require("dependencies/scripts/moment");
require("dependencies/scripts/moment-timezone");
require("dependencies/scripts/moment-timezone-data");
require("dependencies/scripts/bootstrap");
require("dependencies/scripts/bootstrap-datepicker");
require("dependencies/scripts/bootstrap-timepicker");
require("dependencies/scripts/ZeroClipboard");
require("dependencies/scripts/simplehelp");
require("dependencies/scripts/raven");
require("dependencies/scripts/showdown");
require("dependencies/compiled/templates");

var App = window.App = Ember.Application.create({
    rootElement: "#training-log",

    ready: function () {}
});

// General
require("app/adapters/application");
require("app/models/user");
require("app/models/trainingSession");
require("app/models/sessionType");
require("app/models/insideRoute");
require("app/models/insideRoutesSet");
require("app/models/insideRoutesSession");

require("app/helpers/add");

// Controllers
require("app/controllers/alert");
require("app/controllers/mixins/createAndEdit");
require("app/controllers/mixins/needsDefault");

// Entry
require("app/controllers/logEntry/edit");

// Session Type
require("app/controllers/sessionTypes");

// Inside routes
require("app/controllers/insideRoutesSession");

require("app/models/logEntry");

// require("app/routes/application");
// require("app/routes/logEntry/create");


require("app/views/mainContainer");

require("app/router");
