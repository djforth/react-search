const TabsAction = require("../../src/actions/Tabs_actions");


const actionHelper = require("react-jasmine").checkActions;

describe("TabsAction", function() {

  let options = [
    {
      action:"addingTabs",
      handler:"handleAddingTabs",
      args:["foo"],
      dispactchArgs:{
        type : "ADDING_TABS",
        tabs : "foo"
      }
    },
    {
      action:"changeDevice",
      handler:"handleChangeDevice",
      args:["foo"],
      dispactchArgs:{
        type   : "CHANGE_DEVICE",
        device : "foo"
      }
    },
    {
      action:"changeTab",
      handler:"handleChangeTab",
      args:["foo"],
      dispactchArgs:{
        type : "CHANGE_TABS",
        tab  : "foo"
      }
    },
  ];

  actionHelper(TabsAction, "TabsDispatcher", options);

});