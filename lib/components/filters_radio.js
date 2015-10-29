//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

// const FilterStore      = require("../../stores/filterStore");
// const DataActions    = require("../../actions/data_actions");

var FilterActions = require("../actions/filter_actions");

//Mixins
var textMixins = require("morse-react-mixins").text_mixins;

var FiltersRadio = (function (_React$Component) {
  _inherits(FiltersRadio, _React$Component);

  function FiltersRadio(props) {
    _classCallCheck(this, FiltersRadio);

    _get(Object.getPrototypeOf(FiltersRadio.prototype), "constructor", this).call(this, props);
    this.state = { selected: null };
  }

  _createClass(FiltersRadio, [{
    key: "checkSelected",
    value: function checkSelected(id) {
      return this.state.selected === id;
    }
  }, {
    key: "_onChange",
    value: function _onChange(e) {
      var val = e.target.value;
      var filterBy = this.props.filter.getDetails("filterBy");

      this.setState({ selected: Number(val) });
      FilterActions.selectFilter(filterBy, val);
    }
  }, {
    key: "renderFiltersOpts",
    value: function renderFiltersOpts() {
      var _this = this;

      if (this.props.filter) {
        var _ret = (function () {
          var opts = _this.props.filter.getAll();
          var filterBy = _this.props.filter.getDetails("filterBy");
          var items = opts.map((function (f) {
            return React.createElement(
              "label",
              { className: "radio-inline", key: f.get("id") },
              React.createElement("input", { value: f.get("id"), name: filterBy, type: "radio", onChange: this._onChange.bind(this), checked: this.checkSelected(f.get("id")), key: _.uniqueId("radio") }),
              React.createElement(
                "span",
                { key: _.uniqueId("title") },
                f.get("title")
              )
            );
          }).bind(_this));

          return {
            v: items
          };
        })();

        if (typeof _ret === "object") return _ret.v;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var title = this.props.filter.getDetails("title");

      return React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "label",
          { key: _.uniqueId("radio-group-label") },
          title
        ),
        React.createElement(
          "div",
          { className: "radio radio-group", key: _.uniqueId("radio-group") },
          this.renderFiltersOpts()
        )
      );
    }
  }]);

  return FiltersRadio;
})(React.Component);

Object.assign(FiltersRadio.prototype, textMixins);

module.exports = FiltersRadio;
//# sourceMappingURL=filters_radio.js.map