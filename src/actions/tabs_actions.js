const TabsDispatcher = require("../dispatcher/tabs_dispatcher");

module.exports = {
  addingTabs:(tabs)=>{
    TabsDispatcher.handleAddingTabs({
      type : "ADDING_TABS",
      tabs : tabs
    });
  },

  changeDevice:(device)=>{
    TabsDispatcher.handleChangeDevice({
      type   : "CHANGE_DEVICE",
      device : device
    });
  },

  changeTab:(tab)=>{
    TabsDispatcher.handleChangeTab({
      type : "CHANGE_TAB",
      tab  : tab
    });
  }
};
