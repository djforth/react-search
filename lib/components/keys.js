"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Keys).call(this, props));

    _this.active = [{ active: false }];
    _this.state = { active: _this.getClasses(_this.active) };
    return _this;
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