"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react"),
    _ = require("lodash");

var cssMixins = require("morse-react-mixins").css_mixins;

var TabActions = require("../actions/tabs_actions");
var TabStore = require("../stores/tabs_store");

var TabButton = require("./tab_button");

// const Search       = require("../vanilla_components/search");
// const TabItems = require("./tab_items");

// var MorseBootstrap = require("morse-bootstrap-react");
// const FlashNotice  = MorseBootstrap.FlashNotice;

var TabsHolder = (function (_React$Component) {
  _inherits(TabsHolder, _React$Component);

  function TabsHolder(props) {
    _classCallCheck(this, TabsHolder);

    _get(Object.getPrototypeOf(TabsHolder.prototype), "constructor", this).call(this, props);
    this.state = { tabs: [] };
  }

  _createClass(TabsHolder, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({ tabs: TabStore.getTabs(this.props.tabId) });

      TabStore.addChangeListener("adding", this._onAdding.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      TabStore.removeChangeListener("adding", this._onAdding);
    }
  }, {
    key: "_renderTabs",
    value: function _renderTabs() {
      var _this = this;

      if (this.state.tabs) {
        var tabs = _.map(this.state.tabs.items, function (tab, i) {
          return React.createElement(
            "li",
            { key: "tabList" + i },
            React.createElement(TabButton, { tab: tab, tabsId: _this.props.tabsId })
          );
        });

        return tabs;
      }

      return "";
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "ul",
        { className: "tabs" },
        this._renderTabs()
      );
    }
  }, {
    key: "_onAdding",
    value: function _onAdding() {
      this.setState({ tabs: TabStore.getTabs(this.props.tabId) });
    }
  }]);

  return TabsHolder;
})(React.Component);

module.exports = TabsHolder;
//# sourceMappingURL=tabs_holder.js.map