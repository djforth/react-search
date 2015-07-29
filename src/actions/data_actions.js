const DataDispatcher = require("../dispatcher/data_dispatcher");

module.exports = {
  deleteItem:(id, flash)=>{
    DataDispatcher.handleDelete({
      type: "DELETE_ITEM",
      flash: flash,
      id:1
    });
  },

  filterChange:()=>{
    DataDispatcher.handleFilterUpdate({
      type: "FILTER_SEARCH"
    });
  },

  keyUpdate:()=>{
    DataDispatcher.handleKeyUpdate({
      type: "KEY_UPDATE"
    });
  },

  pageChange:(data)=>{
    DataDispatcher.handlePageUpdate({
      type: "PAGE_UPDATE",
      data: data
    });
  },

  receiveAll: (data)=> {
    DataDispatcher.handleServerAction({
      type: "RECEIVE_DATA",
      data: data
    });
  },


  searching:(data)=>{
    DataDispatcher.handleSearchAction({
      type: "SEARCH_DATA",
      data: data
    });
  },

  setSelected:(id, selected)=>{
    DataDispatcher.handleSelectedAction({
      type     : "SET_SELECTED",
      id       : id,
      selected :selected
    });
  }

};
