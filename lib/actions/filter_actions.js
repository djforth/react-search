"use strict";

var FilterDispatcher = require("../dispatcher/filter_dispatcher");

module.exports = {

  receiveAll: function receiveAll(data) {
    FilterDispatcher.handleServerAction({
      type: "RECEIVE_DATA",
      data: data
    });
  },

  changeKey: function changeKey(data) {
    FilterDispatcher.handleKeyUpdate({
      type: "CHANGE_KEY",
      data: data
    });
  },

  checkFilter: function checkFilter(filterBy, id, value) {
    FilterDispatcher.handleCheckFilter({
      type: "CHECK_FILTER",
      filterBy: filterBy,
      id: id,
      value: value
    });
  },

  selectFilter: function selectFilter(filterBy, id) {
    FilterDispatcher.handleSelectFilter({
      type: "SELECT_FILTER",
      filterBy: filterBy,
      id: id
    });
  },

  setKeys: function setKeys(data) {
    FilterDispatcher.setAllKeysUpdate({
      type: "SET_KEYS",
      data: data
    });
  }
};
//# sourceMappingURL=filter_actions.js.map