"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react");
var _ = require("lodash");

//Flux
// const DataStore      = require("../../stores/dataStore");
var FilterStore = require("../stores/filter_store");
var FilterActions = require("../actions/filter_actions");
var DataActions = require("../actions/data_actions");

//components
var FiltersCheck = require("./filters_check");
var isBrowser = typeof global === "undefined";
var FiltersDate = require("./filters_date");
var FiltersSelect = require("./filters_select");
var FiltersRadio = require("./filters_radio");

var SearchFilter = require("./searchfilter");

//Mixins
var cssMixins = require("morse-react-mixins").css_mixins;

var Filters = (function (_React$Component) {
  _inherits(Filters, _React$Component);

  function Filters(props) {
    _classCallCheck(this, Filters);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Filters).call(this, props));

    _this.chevron = ["glyphicon", { "glyphicon-chevron-up": true }, { "glyphicon-chevron-down": false }];
    _this.panel = ["panel-body", "collapse", { "in": false }];
    _this.state = { filters: null, chevron: _this.getClasses(_this.chevron), panel: _this.getClasses(_this.panel) };
    return _this;
  }

  _createClass(Filters, [{
    key: "componentDidMount",
    value: function componentDidMount() {

      //Data Changers
      FilterStore.addChangeListener("change", this._onUpdate.bind(this));
      FilterStore.addChangeListener("fetched", this._onUpdate.bind(this));

      //Get Data
      FilterActions.fetchFilters(this.props.filterApi);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      FilterStore.removeChangeListener("change", this._onUpdate);
      FilterStore.removeChangeListener("fetched", this._onUpdate);
    }
  }, {
    key: "renderDateRanges",
    value: function renderDateRanges() {
      var dr = "";
      if (this.props.date_ranges) {
        dr = _.map(this.props.date_ranges, function (date_range) {
          return React.createElement(FiltersDate, { date_range: date_range, key: _.uniqueId("dates") });
        });
      }

      return dr;
    }
  }, {
    key: "renderFilters",
    value: function renderFilters() {
      if (this.state.filters) {
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
        React.createElement(SearchFilter, { key: "SearchFilter" }),
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
            this.renderDateRanges(),
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
    key: "_onUpdate",
    value: function _onUpdate() {
      this.setState({ filters: FilterStore.getAll() });
    }

    // _onLoaded(){
    //   this.setState({filters:FilterStore.getAll()});

    // }

  }]);

  return Filters;
})(React.Component);

Object.assign(Filters.prototype, cssMixins);

module.exports = Filters;
//# sourceMappingURL=filters.js.map