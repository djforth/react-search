
var BasketDispatcher = require("../dispatcher/basket_dispatcher");

module.exports = {
  addToBasket: (data)=> {

    BasketDispatcher.handleAddToBasket({
      type: "ADD_TO_BASKET",
      data: data
    });
  },

  removeFromBasket: (data)=> {
    BasketDispatcher.handleRemoveFromBasket({
      type: "REMOVE_FROM_BASKET",
      data: data
    });
  }
};
