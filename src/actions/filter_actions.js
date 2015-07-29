const FilterDispatcher = require("../dispatcher/filter_dispatcher");

module.exports = {

  receiveAll: (data)=> {
    FilterDispatcher.handleServerAction({
      type: "RECEIVE_DATA",
      data: data
    });
  },

  changeKey: (data)=> {
    FilterDispatcher.handleKeyUpdate({
      type: "CHANGE_KEY",
      data: data
    });
  },

  checkFilter:(filterBy, id, value)=>{
    FilterDispatcher.handleCheckFilter({
      type: "CHECK_FILTER",
      filterBy:filterBy,
      id:id,
      value:value
    });
  },

  selectFilter:(filterBy, id)=>{
    FilterDispatcher.handleSelectFilter({
      type: "SELECT_FILTER",
      filterBy:filterBy,
      id:id
    });
  },

  setKeys: (data)=> {
    FilterDispatcher.setAllKeysUpdate({
      type: "SET_KEYS",
      data: data
    });
  }
};
