//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

//Flux
var TabsStore = require("../stores/tabs_store");
var FilterStore = require("../stores/filter_store");
var FilterActions = require("../actions/filter_actions");
var DataActions = require("../actions/data_actions");

//Components
var SearchFilter = require("./searchfilter");
var FiltersSelect = require("./filters_select");

//Mixins
var cssMixins = require("morse-react-mixins").css_mixins;

var Filters = (function (_React$Component) {
  _inherits(Filters, _React$Component);

  function Filters(props) {
    _classCallCheck(this, Filters);

    _get(Object.getPrototypeOf(Filters.prototype), "constructor", this).call(this, props);
    this.state = { search: true };
  }

  _createClass(Filters, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //
      //Data Changers
      FilterStore.addChangeListener("change", this._onUpdate.bind(this));
      FilterStore.addChangeListener("fetched", this._onUpdate.bind(this));

      TabsStore.addChangeListener("tab_change", this._onChange.bind(this));

      //Get Data
      FilterActions.fetchFilters(this.props.filterApi);
      FilterActions.setTab(TabsStore.getFilters());
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      FilterStore.removeChangeListener("change", this._onUpdate);
      FilterStore.removeChangeListener("fetched", this._onUpdate);

      TabsStore.removeChangeListener("tab_change", this._onChange);
    }
  }, {
    key: "_filtered",
    value: function _filtered() {
      DataActions.filterChange();
    }
  }, {
    key: "_renderSearch",
    value: function _renderSearch() {
      // console.log(this.props.search)
      if (this.state.search) {
        return React.createElement(SearchFilter, { key: "SearchFilter" });
      }

      return "";
    }
  }, {
    key: "_renderFilters",
    value: function _renderFilters() {
      var _this = this;

      if (this.state.filters) {
        var items = _.map(this.state.filters, function (f) {
          return React.createElement(FiltersSelect, { filter: f, key: _.uniqueId("select"), callback: _this._filtered.bind() });
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
        this._renderSearch(),
        this._renderFilters()
      );
    }
  }, {
    key: "_onUpdate",
    value: function _onUpdate() {
      // FilterActions.setTab(TabsStore.getFilters());
      this.setState({ filters: FilterStore.getVisible() });
    }
  }, {
    key: "_onChange",
    value: function _onChange() {
      // console.log('tabs change', TabsStore.getFilters());
      FilterActions.setTab(TabsStore.getFilters());
      this.setState({ search: TabsStore.getSearch(), filters: FilterStore.getVisible() });
    }
  }]);

  return Filters;
})(React.Component);

Object.assign(Filters.prototype, cssMixins);

module.exports = Filters;
//# sourceMappingURL=filters.js.map