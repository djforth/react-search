
const DataDispatcher = require("../../src/dispatcher/data_dispatcher");

const dispatcherHelper = require("react-jasmine").checkDispatcher;


describe("DataDispatcher", function() {

  let options = [
    {

      handler:"handleDelete",
      source:"DELETE_ITEM"
    },
    {

      handler:"handleKeyUpdate",
      source:"KEY_UPDATE"
    },

    {
      handler:"handleServerAction",
      source:"SERVER_ACTION"
    },

    {

      handler:"handleFilterUpdate",
      source:"FILTER_UPDATE"
    },

    {
      handler:"handlePageUpdate",
      source:"PAGE_UPDATE"
    },

    {
      handler:"handleSearchAction",
      source:"SEARCH_DATA"
    },

    {
      handler:"handleSelectedAction",
      source:"SET_SELECTED"
    }
  ];

  dispatcherHelper(DataDispatcher, options);

});