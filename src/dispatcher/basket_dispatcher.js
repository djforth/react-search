const Dispatcher = require("flux").Dispatcher;
const assign     = require("react/lib/Object.assign");

const BasketDispatcher = assign(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action"s
   * type and additional data coming from the server.
   */
  handleAddToBasket: function(action) {
    var payload = {
      source: "ADD_TO_BASKET",
      action: action
    };
    this.dispatch(payload);
  },

  handleRemoveFromBasket: function(action) {
    var payload = {
      source: "REMOVE_FROM_BASKET",
      action: action
    };
    this.dispatch(payload);
  }
});


module.exports = BasketDispatcher;
