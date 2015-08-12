const EventEmitter  = require("events").EventEmitter;
const assign        = require("react/lib/Object.assign");

const _ = require("lodash");

const textMixins = require("morse-react-mixins").text_mixins;
const ColumnsDispatcher = require("../dispatcher/columns_dispatcher");


const registeredCallback = function(payload) {
  let action = payload.action;
  switch(action.type) {
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

const store = {
  device          : "desktop",
  columns         : [],
  columns_ids     : [],
  visible_columns : [],


  emitChange(event) {
    this.emit(event);
  },

  addChangeListener(event, callback) {
    this.on(event, callback);
  },

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  },

  addColumns(c){
    this.columns = this.setTitles(c);
    this.setVisibleColumns(this.device);
  },

  changeDevice(d){
    this.device = d;
    this.setVisibleColumns(d);
  },

  getKeys(){
    return _.pluck(this.visible_columns, "key");
  },

  getKeyAndTitle(){
    return _.map(this.visible_columns, (col)=> this.reduceObj(col, ["key", "title"]))
  }

  getDateColumns(){
    let dates = _.chain(this.columns)
      .filter((col)=>(col.type === "date" || col.type === "dateTime"))
      .map((col)=> this.reduceObj(col, ["key", "title", "type", "fmt"]))
      .value();

    return dates;
  },

  getSearchable(){
    let searchables = _.chain(this.columns)
      .filter((col)=>col.searchable)
      .map((col)=> this.reduceObj(col, ["key", "title"]))
      .value();

    return searchables;
  },

  getSortable(){
    let sortables = _.chain(this.columns)
      .filter((col)=>col.sortable)
      .map((col)=> this.reduceObj(col, ["key", "title"]))
      .value();

    return sortables;
  },

  getTitles(){
    return _.pluck(this.visible_columns, "title");
  },

  getTitleForKey(key){
    let item = _.find(this.columns, (col)=> col.key === key );
    return item.title;
  },

  getVisible(){
    return this.visible_columns;
  }

  reduceObj(obj, values){
    let reduced = _.omit(obj, (v, k)=>{
      return !_.includes(values, k);
    });
    return reduced;
  },

  setVisibleColumns(device){
    let check = {};
    check[device] = true;
    this.visible_columns = _.where(this.columns, check);
  },

  setTitles(columns){
    columns = _.map(columns, function(col){
      // console.log(that.capitalize)
      if(!_.has(col, "title")){
        let title = this.capitalize(col.key);
        _.set(col, "title", title);
      }

      return col;
    }.bind(this));

    return columns;
  }
};

Object.assign(store, textMixins);


const ColumnsStore = assign({}, EventEmitter.prototype, store);

ColumnsStore.dispatchToken = ColumnsDispatcher.register(registeredCallback);

module.exports = ColumnsStore;
