//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

//Flux
// const DataStore      = require("../../stores/dataStore");
var FilterStore = require("../stores/filter_store");
var FilterActions = require("../actions/filter_actions");
var DataActions = require("../actions/data_actions");

//Components
var SearchFilter = require("./searchfilter");

//Mixins
var cssMixins = require("morse-react-mixins").css_mixins;

var Filters = (function (_React$Component) {
  _inherits(Filters, _React$Component);

  function Filters(props) {
    _classCallCheck(this, Filters);

    _get(Object.getPrototypeOf(Filters.prototype), "constructor", this).call(this, props);
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
    key: "render",
    value: function render() {

      return React.createElement(
        "div",
        { className: "search-filter" },
        React.createElement(SearchFilter, { key: "SearchFilter" })
      );
    }
  }, {
    key: "_onUpdate",
    value: function _onUpdate() {
      this.setState({ filters: FilterStore.getAll() });
    }
  }]);

  return Filters;
})(React.Component);

Object.assign(Filters.prototype, cssMixins);

module.exports = Filters;
//# sourceMappingURL=filters.js.map