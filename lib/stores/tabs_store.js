"use strict";

var EventEmitter = require("events").EventEmitter;
var assign = require("react/lib/Object.assign");

var _ = require("lodash");

var textMixins = require("morse-react-mixins").text_mixins;
var TabsDispatcher = require("../dispatcher/tabs_dispatcher");

var registeredCallback = function registeredCallback(payload) {
  var action = payload.action;
  switch (action.type) {
    case "ADDING_TABS":
      TabsStore.addTabs(action.tabs, action.id);
      TabsStore.emitChange("adding");
      break;

    case "CHANGE_DEVICE":
      TabsStore.changeDevice(action.device);
      TabsStore.emitChange("change");
      break;
  }
};

var store = {
  device: "mobile",
  tabs: [],
  tabs_ids: [],
  visible_tabs: [],

  emitChange: function emitChange(event) {
    this.emit(event);
  },

  addChangeListener: function addChangeListener(event, callback) {
    this.on(event, callback);
  },

  removeChangeListener: function removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  },

  addTabs: function addTabs(t, id) {
    id = id || _.uniqueId();
    var tabs = this.setTitles(t);
    this.tabs.push({ id: id, tabs: tabs });

    return id;
  },

  changeDevice: function changeDevice(d) {
    this.device = d;
    // this.tabs = _.map(this.tabs, (tab)=>{
    //   tab.visible = this.setVisibleTabs(tab.tabs);
    //   return tab;
    // });
  },

  getTab: function getTab(id) {
    var items = undefined;
    if (id) {
      items = _.find(this.tabs, function (tab) {
        return tab.id === id;
      });
    } else {
      items = _.first(this.tabs);
    }

    if (items) {
      return items;
    }

    return { tabs: [] };
  },

  // getTitles(id){
  //   let visible = this.getTab(id).visible;
  //   return _.pluck(visible, "title");
  // },

  // getTitleForKey(key, id){
  //   let tabumn = this.getTab(id).tabs;
  //   let item = _.find(tabumn, (tab)=> tab.key === key );
  //   return item.title;
  // },

  // reduceObj(obj, values){
  //   let reduced = _.omit(obj, (v, k)=>{
  //     return !_.includes(values, k);
  //   });
  //   return reduced;
  // },

  setTitles: function setTitles(tabs) {
    tabs = _.map(tabs, (function (tab) {
      // console.log(that.capitalize)
      if (!_.has(tab, "title")) {
        var title = this.capitalize(tab.key);
        _.set(tab, "title", title);
      }

      return tab;
    }).bind(this));

    return tabs;
  }
};

Object.assign(store, textMixins);

var TabsStore = assign({}, EventEmitter.prototype, store);

TabsStore.dispatchToken = TabsDispatcher.register(registeredCallback);
TabsStore.setMaxListeners(0);

module.exports = TabsStore;
//# sourceMappingURL=tabs_store.js.map