//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");
// const cx    = require("classnames");

//Flux
// const DataStore      = require("../../stores/dataStore");
var FilterStore = require("../stores/filter_store");
var DataActions = require("../actions/data_actions");

//components
var FiltersCheck = require("./filters_check");
var FiltersSelect = require("./filters_select");
var FiltersRadio = require("./filters_radio");
var SearchFilter = require("./searchfilter");

//Mixins
var cssMixins = require("morse-react-mixins").css_mixins;

var Filters = (function (_React$Component) {
  _inherits(Filters, _React$Component);

  function Filters(props) {
    _classCallCheck(this, Filters);

    _get(Object.getPrototypeOf(Filters.prototype), "constructor", this).call(this, props);
    this.chevron = ["glyphicon", { "glyphicon-chevron-up": true }, { "glyphicon-chevron-down": false }];
    this.panel = ["panel-body", { "hide": true }];
    this.state = { filters: null, chevron: this.getClasses(this.chevron), panel: this.getClasses(this.panel) };
  }

  _createClass(Filters, [{
    key: "componentDidMount",
    value: function componentDidMount() {

      //Data Changers
      FilterStore.addChangeListener("change", this._onChange.bind(this));
      FilterStore.addChangeListener("fetched", this._onLoaded.bind(this));

      //Get Data
      // console.log("filterApi", this.props.filterApi)
      FilterStore.setApi(this.props.filterApi);
      FilterStore.fetchData();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      FilterStore.removeChangeListener("change", this._onChange);
      FilterStore.removeChangeListener("fetched", this._onLoaded);
    }
  }, {
    key: "renderFilters",
    value: function renderFilters() {

      if (this.state.filters) {
        // console.log("filterStore",this.state.filters.toJS());
        var items = _.map(this.state.filters, function (f) {
          var elm = undefined;
          switch (f.getDetails("input_type")) {
            case "checkbox":
              elm = React.createElement(FiltersCheck, { filter: f, key: _.uniqueId("check") });
              break;

            case "radio":
              elm = React.createElement(FiltersRadio, { filter: f, key: _.uniqueId("radio") });
              break;
            default:
              elm = React.createElement(FiltersSelect, { filter: f, key: _.uniqueId("select") });
          }

          return elm;
        });

        return items;
      }
    }
  }, {
    key: "render",
    value: function render() {

      return React.createElement(
        "div",
        { className: "search-filter" },
        React.createElement(SearchFilter, { keys: this.props.keys, key: "SearchFilter" }),
        React.createElement(
          "div",
          { className: "panel panel-default" },
          React.createElement(
            "div",
            { className: "panel-heading" },
            "Filters",
            React.createElement(
              "a",
              { href: "#", className: "pull-right clickable", onClick: this._onClick.bind(this) },
              React.createElement(
                "i",
                { className: this.state.chevron },
                " "
              )
            )
          ),
          React.createElement(
            "div",
            { className: this.state.panel },
            this.renderFilters(),
            React.createElement(
              "div",
              { className: "pad20 clearfix" },
              React.createElement(
                "button",
                { type: "button", onClick: this._onFilter, className: "btn btn-success pull-right" },
                React.createElement("span", { className: "glyphicon glyphicon-plus" }),
                " Add Filters"
              )
            )
          )
        )
      );
    }
  }, {
    key: "_onFilter",
    value: function _onFilter(e) {
      e.preventDefault();
      DataActions.filterChange();
    }
  }, {
    key: "_onClick",
    value: function _onClick(e) {
      e.preventDefault();

      this.chevron = this.toggleCss(this.chevron);
      this.panel = this.toggleCss(this.panel);

      this.setState({ chevron: this.getClasses(this.chevron), panel: this.getClasses(this.panel) });
    }
  }, {
    key: "_onChange",
    value: function _onChange() {
      this.setState({ filters: FilterStore.getAll() });
    }
  }, {
    key: "_onLoaded",
    value: function _onLoaded() {
      this.setState({ filters: FilterStore.getAll() });
    }
  }]);

  return Filters;
})(React.Component);

Object.assign(Filters.prototype, cssMixins);

module.exports = Filters;
//# sourceMappingURL=filters.js.map