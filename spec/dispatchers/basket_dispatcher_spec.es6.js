
const BasketDispatcher = require("../../src/dispatcher/basket_dispatcher");

const dispatcherHelper = require("react-jasmine").checkDispatcher;


describe("BasketDispatcher", function() {

  let options = [
    {
      handler:"handleAddToBasket",
      source:"ADD_TO_BASKET"
    },

    {
      handler:"handleRemoveFromBasket",
      source:"REMOVE_FROM_BASKET"
    }
  ];

  dispatcherHelper(BasketDispatcher, options);

});