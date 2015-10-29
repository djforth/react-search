//Libraries
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons"),
    _ = require("lodash");

var DataStore = require("../stores/data_store");
var TabActions = require("../actions/tabs_actions");

var Search = require("../vanilla_components/search");
var TabItems = require("./tab_items");
var TabButton = require("./tab_button");
var TabsHolder = require("./tabs_holder");

// var MorseBootstrap = require("morse-bootstrap-react");
// const FlashNotice  = MorseBootstrap.FlashNotice;

var TabSearch = (function (_React$Component) {
  _inherits(TabSearch, _React$Component);

  function TabSearch(props) {
    _classCallCheck(this, TabSearch);

    _get(Object.getPrototypeOf(TabSearch.prototype), "constructor", this).call(this, props);
    this.state = { tabsId: null };
  }

  _createClass(TabSearch, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props.tabs) {
        var id = _.uniqueId("tabs");
        TabActions.addingTabs(this.props.tabs, id);
        // console.log(id);
        this.setState({ tabsId: id });
      }
    }
  }, {
    key: "_renderIntro",
    value: function _renderIntro() {
      if (this.props.intro) {
        return React.createElement(
          "p",
          { className: "intro", key: "intro" },
          this.props.intro
        );
      }

      return "";
    }
  }, {
    key: "render",
    value: function render() {
      // console.log("tabs", this.state.tabsId)
      return React.createElement(
        "div",
        { className: "search" },
        React.createElement(TabsHolder, { tabsId: this.state.tabsId }),
        React.createElement(
          "div",
          { className: "search-body" },
          this._renderIntro(),
          React.createElement(
            Search,
            this.props,
            React.createElement(
              "h2",
              { className: "osw-r up-c gamma sub" },
              "Or browse all Jobs... "
            ),
            React.createElement(TabItems, _extends({}, this.props, { key: "GenericItems" }))
          )
        )
      );
    }
  }]);

  return TabSearch;
})(React.Component);

module.exports = TabSearch;
//# sourceMappingURL=tab_search.js.map