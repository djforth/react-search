//Libraries
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

//Morse Libraries
// const ViewportDetect = require("viewport-detection-es6");

//Flux
var TabsStore = require("../stores/tabs_store");

//Components
var DataItems = require("../vanilla_components/data_items");
var TabItem = require("./tab_item");
// const GenericExpander = require("./generic_expander");
// const DataItem        = require("../components/data_item");

var TabItems = (function (_DataItems) {
  _inherits(TabItems, _DataItems);

  function TabItems(props) {
    _classCallCheck(this, TabItems);

    _get(Object.getPrototypeOf(TabItems.prototype), "constructor", this).call(this, props);
  }

  _createClass(TabItems, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(Object.getPrototypeOf(TabItems.prototype), "componentDidMount", this).call(this);

      TabsStore.addChangeListener("tab_change", this._onSearch.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(TabItems.prototype), "componentWillUnmount", this).call(this);
      TabsStore.removeChangeListener("tab_change", this._onSearch);
    }
  }, {
    key: "renderData",
    value: function renderData() {
      var _this = this;

      if (this.state.data && this.state.data.size > 0) {

        var items = this.state.data.map(function (k) {
          if (k) {
            return React.createElement(TabItem, _extends({}, _this.props, {
              data: k,
              key: k.get("id")
            }));
          }

          return "";
        });

        return items;
      }

      // console.log(this.state.loading)
      if (this.state.data.size <= 0) {
        return React.createElement(
          "div",
          { className: "loader", key: "loader" },
          React.createElement(
            "h5",
            null,
            this.props.noresults
          )
        );
      }
      return "";
    }
  }]);

  return TabItems;
})(DataItems);

module.exports = TabItems;
//# sourceMappingURL=tab_items.js.map