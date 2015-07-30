"use strict";

var _ = require("lodash");

var FilterDispatcher = require("../dispatcher/filter_dispatcher");
var FilterAction = require("../actions/filter_actions");
var EventEmitter = require("events").EventEmitter;
var assign = require("react/lib/Object.assign");

var AjaxPromises = require("ajax-es6-module");
var ajaxPromises = new AjaxPromises();

var FiltersFcty = require("../factories/filters_fcty");

// let Masterfilters =  new FiltersFcty();

var registeredCallback = function registeredCallback(payload) {
  var action = payload.action;
  switch (action.type) {

    case "CHANGE_KEY":
      FilterStore.setSelected(action.data);
      FilterStore.emitChange("change_key");
      break;

    case "CHECK_FILTER":
      // _data = action.data;
      FilterStore.checked(action.filterBy, action.id, action.value);
      FilterStore.emitChange("filter_change");
      break;

    case "RECEIVE_DATA":
      // _data = action.data;
      FilterStore.emitChange("fetched");
      break;

    case "SELECT_FILTER":
      // _data = action.data;
      FilterStore.selected(action.filterBy, action.id);
      FilterStore.emitChange("filter_change");
      break;

    case "SET_KEYS":
      FilterStore.setKeys(action.data);
      FilterStore.emitChange("setting_keys");
      break;
  }
};

// var keys     = [];
// var selected = "all";
// var filters  = [];
// var changed  = true;
// var cache;
// const store =  { };

var store = {
  keys: [],
  selectedKey: "all",
  filters: [],
  changed: true,
  cache: null,

  emitChange: function emitChange(event) {
    this.emit(event);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function addChangeListener(event, callback) {
    this.on(event, callback);
  },

  removeChangeListener: function removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  },

  checked: function checked(filterBy, id, _checked) {
    var filter = this.get(filterBy);

    if (filter) {
      filter.setSelected(id, _checked);
    }
    this.changed = true;
  },

  fetchData: function fetchData() {
    var _this = this;

    return ajaxPromises.fetch().then(function (data) {
      _this.filters = _this.processFilters(data);
      FilterAction.receiveAll(_this.filters);
      return _this.filters;
    })["catch"](function (err) {
      throw new Error(err);
    });
  },

  get: function get(id) {
    return _.find(this.filters, function (f) {
      return f.hasDetails("filterBy", id);
    });
  },

  getAll: function getAll() {
    return this.filters;
  },

  getAllKeys: function getAllKeys() {
    return this.keys;
  },

  getFilters: function getFilters() {
    var data = this.cache;
    if (this.changed) {
      this.cache = data = this.getSelectedFilters();
      this.changed = false;
    }
    return data;
  },

  getSelectedFilters: function getSelectedFilters() {
    return _.map(this.filters, function (f) {
      return f.getSelected();
    });
  },

  getSelectedKey: function getSelectedKey() {

    return this.selectedKey;
  },

  getSelectedKeys: function getSelectedKeys() {
    if (this.selectedKey === "all") {
      return this.keys;
    } else {
      return [this.selectedKey];
    }
  },

  isSelectedKey: function isSelectedKey(k) {
    return this.selectedKey === k;
  },

  setKeys: function setKeys(ks) {
    this.keys = ks;
  },

  processFilters: function processFilters(data) {
    return _.map(data, function (d) {
      var fcty = new FiltersFcty(d.title, d.filter_by, d.filter_options, d.input_type);
      fcty.setSelected("all", true);
      return fcty;
    });
  },

  selected: function selected(filterBy, id) {
    var val = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    var filter = this.get(filterBy);
    filter.setSelected(id, val, true);
    this.changed = true;
  },

  setSelected: function setSelected(sel) {
    this.selectedKey = sel;
  },

  setApi: function setApi(uri) {
    ajaxPromises.addUrl(uri);
  }

};

var FilterStore = assign({}, EventEmitter.prototype, store);
FilterStore.setMaxListeners(0);
FilterStore.dispatchToken = FilterDispatcher.register(registeredCallback);
module.exports = FilterStore;
//# sourceMappingURL=filter_store.js.map