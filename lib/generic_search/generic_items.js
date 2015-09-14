//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");

//Morse Libraries
var ViewportDetect = require("viewport-detection-es6");

//Components
var DataItems = require('../components/data_items');
var GenericItem = require("./generic_item");
var DataItem = require('../components/data_item');

var GenericItems = (function (_DataItems) {
  _inherits(GenericItems, _DataItems);

  function GenericItems(props) {
    _classCallCheck(this, GenericItems);

    _get(Object.getPrototypeOf(GenericItems.prototype), "constructor", this).call(this, props);
  }

  _createClass(GenericItems, [{
    key: "renderData",
    value: function renderData() {
      var _this = this;

      if (this.state.data && this.state.data.size > 0) {
        var items = this.state.data.map(function (k) {
          if (k) {
            return React.createElement(GenericItem, {
              css: _this.props.css,
              data: k,
              "delete": _this.props["delete"],
              edit: _this.props.edit,
              keys: _this.state.visible,
              key: k.get("id"),
              tooltip: _this.props.tooltip
            });
          }

          return "";
        });

        return items;
      }

      // console.log(this.state.loading)
      if (this.state.data.size <= 0) {
        return React.createElement(
          "div",
          { className: "loader" },
          React.createElement(
            "h5",
            null,
            "Nothing Matches your search"
          )
        );
      }
      return "";
    }
  }]);

  return GenericItems;
})(DataItems);

module.exports = GenericItems;
//# sourceMappingURL=generic_items.js.map