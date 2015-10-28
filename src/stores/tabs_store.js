const EventEmitter  = require("events").EventEmitter;
const assign        = require("react/lib/Object.assign");

const _ = require("lodash");

const textMixins = require("morse-react-mixins").text_mixins;
const TabsDispatcher = require("../dispatcher/tabs_dispatcher");


const registeredCallback = function(payload) {
  let action = payload.action;
  switch(action.type) {
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

const store = {
  device       : "mobile",
  tabs         : [],
  tabs_ids     : [],
  visible_tabs : [],


  emitChange(event) {
    this.emit(event);
  },

  addChangeListener(event, callback) {
    this.on(event, callback);
  },

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  },

  addTabs(t, id){
    id   = id || _.uniqueId();
    let tabs = this.setTitles(t);
    this.tabs.push({id:id, tabs:tabs});

    return id;
  },

  changeDevice(d){
    this.device = d;
    // this.tabs = _.map(this.tabs, (tab)=>{
    //   tab.visible = this.setVisibleTabs(tab.tabs);
    //   return tab;
    // });

  },

  getTab(id){
    let items;
    if(id){
      items =  _.find(this.tabs, (tab)=>{
        return tab.id === id;
      });
    } else {
      items = _.first(this.tabs);
    }

    if(items){
      return items;
    }

    return {tabs:[]};
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


  setTitles(tabs){
    tabs = _.map(tabs, function(tab){
      // console.log(that.capitalize)
      if(!_.has(tab, "title")){
        let title = this.capitalize(tab.key);
        _.set(tab, "title", title);
      }

      return tab;
    }.bind(this));

    return tabs;
  }
};

Object.assign(store, textMixins);


const TabsStore = assign({}, EventEmitter.prototype, store);

TabsStore.dispatchToken = TabsDispatcher.register(registeredCallback);
TabsStore.setMaxListeners(0);

module.exports = TabsStore;
