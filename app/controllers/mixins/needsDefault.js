"use strict";

App.NeedsDefaultControllerMixin = Ember.Mixin.create({
    // Properties
    needs: ["application"],

    content: null,
    app: Ember.computed.alias("controllers.application")
});
