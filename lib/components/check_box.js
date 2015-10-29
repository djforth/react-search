//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var FilterActions = require("../actions/filter_actions");

//Mixins
var textMixins = require("morse-react-mixins").text_mixins;

var CheckBox = (function (_React$Component) {
  _inherits(CheckBox, _React$Component);

  function CheckBox(props) {
    _classCallCheck(this, CheckBox);

    _get(Object.getPrototypeOf(CheckBox.prototype), "constructor", this).call(this, props);
  }

  _createClass(CheckBox, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        id: this.createId(this.props.filterBy, this.props.data.title, this.props.data.id),
        value: this.props.data.id,
        title: this.props.data.title,
        selected: this.props.data.selected
      });
    }
  }, {
    key: "_onChecked",
    value: function _onChecked() {
      var selected = this.state.selected ? false : true;
      this.setState({ selected: selected });
      FilterActions.checkFilter(this.props.filterBy, String(this.state.value), selected);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "label",
        { htmlFor: this.state.id, className: "checkbox-inline" },
        React.createElement("input", { type: "checkbox", value: this.state.value, id: this.state.id, checked: this.state.selected, onChange: this._onChecked.bind(this) }),
        this.state.title
      );
    }
  }]);

  return CheckBox;
})(React.Component);

Object.assign(CheckBox.prototype, textMixins);

module.exports = CheckBox;
//# sourceMappingURL=check_box.js.map