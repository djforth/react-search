"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react");
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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FiltersRadio).call(this, props));

    _this.state = { selected: null };
    return _this;
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
      var _this2 = this;

      if (this.props.filter) {
        var _ret = (function () {
          var opts = _this2.props.filter.getAll();
          var filterBy = _this2.props.filter.getDetails("filterBy");
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
          }).bind(_this2));

          return {
            v: items
          };
        })();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
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