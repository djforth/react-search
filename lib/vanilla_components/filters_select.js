//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var _ = require("lodash");

// const FilterStore      = require("../../stores/filterStore");
var FilterActions = require("../actions/filter_actions");

var FiltersSelect = (function (_React$Component) {
  _inherits(FiltersSelect, _React$Component);

  function FiltersSelect(props) {
    _classCallCheck(this, FiltersSelect);

    _get(Object.getPrototypeOf(FiltersSelect.prototype), "constructor", this).call(this, props);
    this.state = { selected: "all" };
  }

  _createClass(FiltersSelect, [{
    key: "_onChange",
    value: function _onChange(e) {
      var val = e.target.value;
      var filterBy = this.props.filter.getDetails("filterBy");

      this.setState({ selected: Number(e.target.value) });
      FilterActions.selectFilter(filterBy, val);
      if (_.isFunction(this.props.callback)) {
        this.props.callback();
      }
    }
  }, {
    key: "renderOptions",
    value: function renderOptions() {
      if (this.props.filter) {
        var opts = this.props.filter.getAll();

        var items = opts.map((function (f) {

          if (this.state.selected === f.get("id")) {
            return React.createElement(
              "option",
              {
                key: _.uniqueId(),
                value: f.get("id"),
                selected: true
              },
              f.get("title")
            );
          } else {
            return React.createElement(
              "option",
              {
                key: _.uniqueId(),
                value: f.get("id")
              },
              f.get("title")
            );
          }
        }).bind(this));

        return items;
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
          null,
          title
        ),
        React.createElement(
          "select",
          { onChange: this._onChange.bind(this), className: "form-control" },
          React.createElement(
            "option",
            { value: "all" },
            "All"
          ),
          this.renderOptions()
        )
      );
    }
  }]);

  return FiltersSelect;
})(React.Component);

module.exports = FiltersSelect;
//# sourceMappingURL=filters_select.js.map