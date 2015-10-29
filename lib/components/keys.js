//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var _ = require("lodash");

// const DataStore  = require("../stores/dataStore");

var FilterStore = require("../stores/filter_store");

var DataActions = require("../actions/data_actions");
var FilterActions = require("../actions/filter_actions");

//Mixins
var cssMixins = require("morse-react-mixins").css_mixins;
var textMixins = require("morse-react-mixins").text_mixins;

var Keys = (function (_React$Component) {
  _inherits(Keys, _React$Component);

  _createClass(Keys, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (FilterStore.isSelectedKey(this.props.item)) {
        this.active = [{ active: true }];
        this.setState({ active: this.getClasses(this.active) });
      }

      FilterStore.addChangeListener("change_key", this._onChange.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      FilterStore.removeChangeListener("change_key", this._onChange);
    }
  }]);

  function Keys(props) {
    _classCallCheck(this, Keys);

    _get(Object.getPrototypeOf(Keys.prototype), "constructor", this).call(this, props);
    this.active = [{ active: false }];
    this.state = { active: this.getClasses(this.active) };
  }

  _createClass(Keys, [{
    key: "_select",
    value: function _select(e) {
      e.preventDefault();

      this.active = this.toggleCss(this.active);
      this.setState({ active: this.getClasses(this.active) });
      FilterActions.changeKey(this.props.item.key);
      DataActions.keyUpdate();
    }
  }, {
    key: "_onChange",
    value: function _onChange() {
      if (FilterStore.isSelectedKey(this.props.item)) {
        this.active = [{ active: true }];
        this.setState({ active: this.getClasses(this.active) });
      } else {
        this.active = [{ active: false }];
        this.setState({ active: this.getClasses(this.active) });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "li",
        { className: this.state.active },
        React.createElement(
          "a",
          { href: "#", onClick: this._select.bind(this), key: _.uniqueId() },
          this.props.item.title
        )
      );
    }
  }]);

  return Keys;
})(React.Component);

Object.assign(Keys.prototype, cssMixins);
Object.assign(Keys.prototype, textMixins);

module.exports = Keys;
//# sourceMappingURL=keys.js.map