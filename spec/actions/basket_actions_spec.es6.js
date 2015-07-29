

const BasketAction = require("../../src/actions/basket_actions");

const actionHelper = require("react-jasmine").checkActions;

describe("BasketAction", function() {

  let options = [
    {
      action:"addToBasket",
      handler:"handleAddToBasket",
      args:["foo"],
      dispactchArgs:{
        type:"ADD_TO_BASKET",
        data:"foo"
      }
    },

    {
      action:"removeFromBasket",
      handler:"handleRemoveFromBasket",
      args:["foo"],
      dispactchArgs:{
        type:"REMOVE_FROM_BASKET",
        data:"foo"
      }
    }
  ];

  actionHelper(BasketAction, "BasketDispatcher", options);

});