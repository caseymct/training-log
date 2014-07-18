"use strict";

App.CreateAndEdit = Ember.Mixin.create({
    // Properties
    isNew: false,

    // Methods
    resetFlagAndModel: function () {
        if (this.get("isNew")) {
            this.get("model").deleteRecord();
            this.set("isNew", false);
        }
    }
});
