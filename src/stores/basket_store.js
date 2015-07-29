const EventEmitter  = require("events").EventEmitter;
const assign        = require("react/lib/Object.assign");

const DataStore = require("../stores/data_store");

const DataFcty = require("../factories/data_fcty");
let basket =  new DataFcty();

const BasketDispatcher = require("../dispatcher/basket_dispatcher");

var basket_ids = [];

const registeredCallback = function(payload) {
  let action = payload.action;
  switch(action.type) {
    case "ADD_TO_BASKET":
      BasketStore.addItem(action.data);
      BasketStore.emitChange("adding");
      break;

    case "REMOVE_FROM_BASKET":
      BasketStore.removeItem(action.data);
      BasketStore.emitChange("remove");
      break;
    }
};

const store = {
  basket     :  new DataFcty(),
  basket_ids :[],


  emitChange(event) {
    this.emit(event);
  },

  addChangeListener(event, callback) {
    this.on(event, callback);
  },

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  },

  addByIds(ids){
    let added = DataStore.getByIds(ids);
    this.basket_ids = ids;
    if(added){
      this.basket.add(added.toJS());
    }

    return {samples:added, sample_ids:ids};
  },

  addItem(d){
    this.basket.add(d);
  },

  getData(){
    let samples =  this.basket.getAll();
    let ids = samples.map((s)=>{
      return s.get("id");
    });

    this.basket_ids = ids.toJS();

    return {samples:samples, sample_ids:ids.toJS()};
  },

  removeItem(d){

    this.basket.remove(d);
  },

  addSelected(ids){
    console.debug(this.basket_ids, ids);
    this.basket_ids = ids;
    DataStore.selectedIds(ids);
  }
};


const BasketStore = assign({}, EventEmitter.prototype, store);


BasketStore.dispatchToken = BasketDispatcher.register(registeredCallback);

module.exports = BasketStore;
