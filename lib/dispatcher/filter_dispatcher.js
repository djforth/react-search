"use strict";

var Dispatcher = require("flux").Dispatcher;
var assign = require("react/lib/Object.assign");

var FilterDispatcher = assign(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action"s
   * type and additional data coming from the server.
   */
  handleServerAction: function handleServerAction(action) {
    var payload = {
      source: "SERVER_ACTION",
      action: action
    };
    this.dispatch(payload);
  },

  handleCheckFilter: function handleCheckFilter(action) {
    var payload = {
      source: "CHECK_FILTER",
      action: action
    };

    this.dispatch(payload);
  },

  handleSelectFilter: function handleSelectFilter(action) {
    var payload = {
      source: "SELECT_FILTER",
      action: action
    };

    this.dispatch(payload);
  },

  handleKeyUpdate: function handleKeyUpdate(action) {
    var payload = {
      source: "KEY_UPDATE",
      action: action
    };

    this.dispatch(payload);
  },

  setAllKeysUpdate: function setAllKeysUpdate(action) {
    var payload = {
      source: "SETTING_KEYS",
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = FilterDispatcher;
//# sourceMappingURL=filter_dispatcher.js.map