const _ = require("lodash");

const FilterDispatcher = require("../dispatcher/filter_dispatcher");
const FilterAction     = require("../actions/filter_actions");
const EventEmitter     = require("events").EventEmitter;
const assign           = require("react/lib/Object.assign");

const AjaxPromises  = require("ajax-es6-module");
let ajaxPromises    = new AjaxPromises();

const FiltersFcty = require("../factories/filters_fcty");

// let Masterfilters =  new FiltersFcty();

const registeredCallback = function(payload) {
  var action = payload.action;
  switch(action.type) {

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

const store =  {
  keys         : [],
  selectedKey  : "all",
  filters      : [],
  changed      : true,
  cache        : null,

  emitChange(event) {
    this.emit(event);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(event, callback) {
    this.on(event, callback);
  },

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  },

  checked(filterBy, id, checked){
    let filter = this.get(filterBy);

    if(filter){
      filter.setSelected(id, checked);
    }
    this.changed  = true;
  },

  fetchData(){
    return ajaxPromises.fetch().then((data)=>{
      this.filters = this.processFilters(data);
      FilterAction.receiveAll(this.filters);
      return this.filters;
    }).catch((err)=>{
      throw new Error(err);
    });
  },

  get(id) {
    return _.find(this.filters, (f)=>{
      return f.hasDetails("filterBy", id);
    });
  },

  getAll() {
    return this.filters;
  },

  getAllKeys() {
    return this.keys;
  },

  getFilters(){
    let data = this.cache;
    if(this.changed) {
      this.cache =  data = this.getSelectedFilters();
      this.changed = false;
    }
    return data;
  },

  getSelectedFilters(){
    return _.map(this.filters, (f)=>{
      return f.getSelected();
    });
  },

  getSelectedKey(){

    return this.selectedKey;
  },

  getSelectedKeys(){
    if(this.selectedKey === "all"){
      return this.keys;
    } else {
      return [this.selectedKey];
    }
  },

  isSelectedKey(k){
    return this.selectedKey === k;
  },

  setKeys(ks){
    this.keys = ks;
  },

  processFilters(data){
    return _.map(data, (d)=>{
      let fcty = new FiltersFcty(d.title, d.filter_by, d.filter_options, d.input_type);
      fcty.setSelected("all", true);
      return fcty;
    });
  },

  selected(filterBy, id, val=true){
    let filter = this.get(filterBy);
    filter.setSelected(id, val, true);
    this.changed  = true;
  },

  setSelected(sel){
    this.selectedKey = sel;
  },

  setApi(uri){
    ajaxPromises.addUrl(uri);
  }

};

const FilterStore = assign({}, EventEmitter.prototype, store);
FilterStore.setMaxListeners(0);
FilterStore.dispatchToken = FilterDispatcher.register(registeredCallback);
module.exports = FilterStore;
