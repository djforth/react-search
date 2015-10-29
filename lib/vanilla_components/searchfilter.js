//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

var DataActions = require("../actions/data_actions");
var DataStore = require("../stores/data_store");
var FilterStore = require("../stores/filter_store");
var ColumnsStore = require("../stores/columns_store");

//Mixins
var cssMixins = require("morse-react-mixins").css_mixins;
var textMixins = require("morse-react-mixins").text_mixins;

var SearchFilters = (function (_React$Component) {
  _inherits(SearchFilters, _React$Component);

  function SearchFilters(props) {
    _classCallCheck(this, SearchFilters);

    _get(Object.getPrototypeOf(SearchFilters.prototype), "constructor", this).call(this, props);
    this.dropdown = ["input-group-btn", { "open": false }];

    this.state = {
      dropdown: this.getClasses(this.dropdown),
      expanded: "false",
      selectedkey: "all",
      searchVal: ""
    };
  }

  _createClass(SearchFilters, [{
    key: "componentDidMount",
    value: function componentDidMount() {

      this.quickSearch = _.isBoolean(this.props.quickSearch) ? this.props.quickSearch : true;

      if (FilterStore.isSelectedKey(this.props.item)) {
        this.active = [{ active: true }];
        this.setState({ active: this.getClasses(this.active) });
      }

      this.setState({ searchVal: DataStore.getSearchVal() });
      // FilterStore.addChangeListener("change_key", this._openDropdown.bind(this));
      ColumnsStore.addChangeListener("adding", this._onAdd.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // FilterStore.removeChangeListener("change_key", this._openDropdown);
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
          if (val.length > 2 || val === "") {
            DataActions.searching(val);
          }
        }, 200, e.target.value);

        this.setState({ searchVal: e.target.value });
      }

      // _.defer((val)=>{
      //   DataActions.searching(val);
      // }, e.target.value);
    }

    // _openDropdown(){
    //   this.dropdown = this.toggleCss(this.dropdown);
    //   let expanded  = (this.state.expended === "true") ? "false" : "true";
    //   this.setState({
    //     dropdown:this.getClasses(this.dropdown),
    //     expanded:expanded,
    //     selectedkey:FilterStore.getSelectedKey()
    //   });
    // }

  }, {
    key: "_preventSubmit",
    value: function _preventSubmit(e) {
      // console.log("submiting", e);
      e.preventDefault();
    }

    // renderKeys(){
    //   if(this.state.keys){
    //     let items = this.state.keys.map(function(k){
    //       return (<Keys item={k} key={_.uniqueId("key")} />);
    //       });

    //       return items;
    //   }
    // }

  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { onSubmit: this._preventSubmit.bind(this), className: "search-filter" },
        React.createElement("input", { alt: "Search", type: "image", src: "/assets/images/search.png" }),
        React.createElement(
          "div",
          { className: "fields-container" },
          React.createElement("input", { type: "text", name: "querystr", id: "querystr", placeholder: "Search", value: this.state.searchVal, onChange: this._onChange.bind(this) })
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