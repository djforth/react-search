"use strict";

var EventEmitter = require("events").EventEmitter;
var assign = require("react/lib/Object.assign");

var _ = require("lodash");

var textMixins = require("morse-react-mixins").text_mixins;
var ColumnsDispatcher = require("../dispatcher/columns_dispatcher");

var registeredCallback = function registeredCallback(payload) {
  var action = payload.action;
  switch (action.type) {
    case "ADDING_COLUMNS":
      ColumnsStore.addColumns(action.columns);
      ColumnsStore.emitChange("adding");
      break;

    case "CHANGE_DEVICE":
      ColumnsStore.changeDevice(action.device);
      ColumnsStore.emitChange("change");
      break;
  }
};

var store = {
  device: "desktop",
  columns: [],
  columns_ids: [],
  visible_columns: [],

  emitChange: function emitChange(event) {
    this.emit(event);
  },

  addChangeListener: function addChangeListener(event, callback) {
    this.on(event, callback);
  },

  removeChangeListener: function removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  },

  addColumns: function addColumns(c) {
    this.columns = this.setTitles(c);
    this.setVisibleColumns(this.device);
  },

  changeDevice: function changeDevice(d) {
    this.device = d;
    this.setVisibleColumns(d);
  },

  getKeys: function getKeys() {
    return _.pluck(this.visible_columns, "key");
  },

  getKeyAndTitle: function getKeyAndTitle() {
    var _this = this;

    return _.map(this.visible_columns, function (col) {
      return _this.reduceObj(col, ["key", "title"]);
    });
  },

  getDateColumns: function getDateColumns() {
    var _this2 = this;

    var dates = _.chain(this.columns).filter(function (col) {
      return col.type === "date" || col.type === "dateTime";
    }).map(function (col) {
      return _this2.reduceObj(col, ["key", "title", "type", "fmt"]);
    }).value();

    return dates;
  },

  getSearchable: function getSearchable() {
    var _this3 = this;

    var searchables = _.chain(this.columns).filter(function (col) {
      return col.searchable;
    }).map(function (col) {
      return _this3.reduceObj(col, ["key", "title"]);
    }).value();

    return searchables;
  },

  getSortable: function getSortable() {
    var _this4 = this;

    var sortables = _.chain(this.columns).filter(function (col) {
      return col.sortable;
    }).map(function (col) {
      return _this4.reduceObj(col, ["key", "title"]);
    }).value();

    return sortables;
  },

  getTitles: function getTitles() {
    return _.pluck(this.visible_columns, "title");
  },

  getTitleForKey: function getTitleForKey(key) {
    var item = _.find(this.columns, function (col) {
      return col.key === key;
    });
    return item.title;
  },

  getVisible: function getVisible() {
    return this.visible_columns;
  },

  reduceObj: function reduceObj(obj, values) {
    var reduced = _.omit(obj, function (v, k) {
      return !_.includes(values, k);
    });
    return reduced;
  },

  setVisibleColumns: function setVisibleColumns(device) {
    var check = {};
    check[device] = true;
    this.visible_columns = _.where(this.columns, check);
  },

  setTitles: function setTitles(columns) {
    columns = _.map(columns, (function (col) {
      // console.log(that.capitalize)
      if (!_.has(col, "title")) {
        var title = this.capitalize(col.key);
        _.set(col, "title", title);
      }

      return col;
    }).bind(this));

    return columns;
  }
};

Object.assign(store, textMixins);

var ColumnsStore = assign({}, EventEmitter.prototype, store);

ColumnsStore.dispatchToken = ColumnsDispatcher.register(registeredCallback);
ColumnsStore.setMaxListeners(0);

module.exports = ColumnsStore;
//# sourceMappingURL=columns_store.js.map