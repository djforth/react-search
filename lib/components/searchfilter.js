"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react");
var _ = require("lodash");

var DataActions = require("../actions/data_actions");
var FilterStore = require("../stores/filter_store");
var ColumnsStore = require("../stores/columns_store");

//Mixins
var cssMixins = require("morse-react-mixins").css_mixins;
var textMixins = require("morse-react-mixins").text_mixins;

//Components
var Keys = require("./keys");

var SearchFilters = (function (_React$Component) {
  _inherits(SearchFilters, _React$Component);

  // mixins: [cssMixins, textMixins],

  function SearchFilters(props) {
    _classCallCheck(this, SearchFilters);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SearchFilters).call(this, props));

    _this.dropdown = ["input-group-btn", { "open": false }];

    _this.state = {
      dropdown: _this.getClasses(_this.dropdown),
      expanded: "false",
      selectedkey: "all"
    };
    return _this;
  }

  _createClass(SearchFilters, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.quickSearch = _.isBoolean(this.props.quickSearch) ? this.props.quickSearch : true;

      if (FilterStore.isSelectedKey(this.props.item)) {
        this.active = [{ active: true }];
        this.setState({ active: this.getClasses(this.active) });
      }

      FilterStore.addChangeListener("change_key", this._openDropdown.bind(this));
      ColumnsStore.addChangeListener("adding", this._onAdd.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      FilterStore.removeChangeListener("change_key", this._openDropdown);
      ColumnsStore.removeChangeListener("adding", this._onAdd);
    }
  }, {
    key: "_onAdd",
    value: function _onAdd() {
      this.setState({
        keys: ColumnsStore.getSearchable()
      });
    }
  }, {
    key: "_onChange",
    value: function _onChange(e) {
      if (this.quickSearch) {
        if (this.loop) {
          window.clearTimeout(this.loop);
        }

        this.loop = window.setTimeout(function (val) {
          if (val.length > 3 || val === "") {
            DataActions.searching(val);
          }
        }, 300, e.target.value);
      }

      // _.defer((val)=>{
      //   DataActions.searching(val);
      // }, e.target.value);
    }
  }, {
    key: "_openDropdown",
    value: function _openDropdown() {
      this.dropdown = this.toggleCss(this.dropdown);
      var expanded = this.state.expended === "true" ? "false" : "true";
      this.setState({
        dropdown: this.getClasses(this.dropdown),
        expanded: expanded,
        selectedkey: FilterStore.getSelectedKey()
      });
    }
  }, {
    key: "_preventSubmit",
    value: function _preventSubmit(e) {
      // console.log("submiting", e);
      e.preventDefault();
    }
  }, {
    key: "renderKeys",
    value: function renderKeys() {
      if (this.state.keys) {
        var items = this.state.keys.map(function (k) {
          return React.createElement(Keys, { item: k, key: _.uniqueId("key") });
        });

        return items;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { onSubmit: this._preventSubmit.bind(this) },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-lg-12" },
            React.createElement(
              "div",
              { className: "input-group vPad20" },
              React.createElement("input", { type: "text", className: "form-control", placeholder: "Search for...", onChange: this._onChange.bind(this) }),
              React.createElement(
                "span",
                { className: this.state.dropdown },
                React.createElement(
                  "button",
                  { className: "btn btn-primary", type: "button" },
                  React.createElement(
                    "span",
                    { className: "glyphicon glyphicon-search", "aria-hidden": "true" },
                    "search"
                  )
                ),
                React.createElement(
                  "button",
                  { type: "button", className: "btn btn-primary dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": this.state.expanded, onClick: this._openDropdown.bind(this) },
                  this.capitalize(this.state.selectedkey),
                  " ",
                  React.createElement("span", { className: "caret" }),
                  React.createElement(
                    "span",
                    { className: "sr-only" },
                    "Toggle Dropdown"
                  )
                ),
                React.createElement(
                  "ul",
                  { className: "dropdown-menu" },
                  React.createElement(Keys, { item: { key: "all", title: "All" } }),
                  React.createElement("li", { role: "separator", className: "divider" }),
                  this.renderKeys()
                )
              )
            )
          )
        )
      );
    }
  }]);

  return SearchFilters;
})(React.Component);

Object.assign(SearchFilters.prototype, cssMixins);
Object.assign(SearchFilters.prototype, textMixins);

module.exports = SearchFilters;
//# sourceMappingURL=searchfilter.js.map