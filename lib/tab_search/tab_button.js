"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons"),
    _ = require("lodash");

var cssMixins = require("morse-react-mixins").css_mixins;

var TabActions = require("../actions/tabs_actions");
var TabStore = require("../stores/tabs_store");

// const Search       = require("../vanilla_components/search");
// const TabItems = require("./tab_items");

// var MorseBootstrap = require("morse-bootstrap-react");
// const FlashNotice  = MorseBootstrap.FlashNotice;

var TabButton = (function (_React$Component) {
  _inherits(TabButton, _React$Component);

  function TabButton(props) {
    _classCallCheck(this, TabButton);

    _get(Object.getPrototypeOf(TabButton.prototype), "constructor", this).call(this, props);
    var opts = props.tab.options;
    this.tabCSS = opts.css.split(" ");
    this.tabCSS.push({ active: opts.active });
    this.state = { css: this.getClasses(this.tabCSS) };
  }

  _createClass(TabButton, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      TabStore.addChangeListener("tab_change", this._tabChange.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      TabStore.removeChangeListener("tab_change", this._tabChange);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "a",
        { href: "#", onClick: this._tabClick.bind(this), className: this.state.css },
        this.props.tab.title
      );
    }
  }, {
    key: "_tabChange",
    value: function _tabChange() {
      var active = TabStore.isActive(this.props.tabsId, this.props.tab.id);
      this.tabCSS = _.map(this.tabCSS, function (t) {
        if (_.isObject(t)) {
          t.active = active;
        }

        return t;
      });

      this.setState({ css: this.getClasses(this.tabCSS) });
    }
  }, {
    key: "_tabClick",
    value: function _tabClick(e) {
      e.preventDefault();

      TabActions.changeTab(this.props.tabsId, this.props.tab.id);
    }
  }]);

  return TabButton;
})(React.Component);

Object.assign(TabButton.prototype, cssMixins);

module.exports = TabButton;
//# sourceMappingURL=tab_button.js.map