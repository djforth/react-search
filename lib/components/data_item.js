"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
// const PureRenderMixin = React.addons.PureRenderMixin;
var _ = require("lodash");

// const DataStore      = require("../stores/data_store");
var ColumnsStore = require("../stores/columns_store");

//Mixins
var cssMixins = require("morse-react-mixins").css_mixins;
var textMixins = require("morse-react-mixins").text_mixins;

var DataItem = (function (_React$Component) {
  _inherits(DataItem, _React$Component);

  function DataItem(props) {
    _classCallCheck(this, DataItem);

    _get(Object.getPrototypeOf(DataItem.prototype), "constructor", this).call(this, props);
    this.active = [{ active: false }];
    // this._select.bind(this);
    this.state = { data: null, columns: [], datefield: [] };
  }

  _createClass(DataItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      this.setState({ data: this.props.data, columns: ColumnsStore.getVisible() });

      ColumnsStore.addChangeListener("change", this._onChange.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      ColumnsStore.removeChangeListener("change", this._onChange);
    }
  }, {
    key: "getFmt",
    value: function getFmt(col) {
      if (_.has(col, "fmt")) {
        return col.fmt;
      }

      if (_.has(col, "type")) {
        if (col.type === "dateTime") {
          return "%d/%m/%Y %H:%M";
        }
        if (col.type === "date") {
          return "%d/%m/%Y";
        }
      }

      return "%d/%m/%Y";
    }
  }, {
    key: "displayData",
    value: function displayData(item, col) {
      var key = col.key;
      var data = item.get(col.key);

      if (_.isDate(data)) {
        data = item.get(key + "Df");
        var fmt = this.getFmt(col);
        return data.formatDate(fmt);
      }

      return this.rawMarkup(data);
    }
  }, {
    key: "renderColumn",
    value: function renderColumn(col, item) {
      return React.createElement(
        "div",
        { className: this.checkCss(this.props.css, col.key), key: _.uniqueId("dataItem") },
        this.displayData(item, col)
      );
    }
  }, {
    key: "rawMarkup",
    value: function rawMarkup(data) {
      return React.createElement("span", { dangerouslySetInnerHTML: { __html: data } });
    }
  }, {
    key: "renderTd",
    value: function renderTd() {
      var item = this.props.data;
      if (item && this.state.columns) {
        var td = _.map(this.state.columns, (function (col) {
          return this.renderColumn(col, item);
        }).bind(this));

        return td;
      }
      return "";
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "row tr vPad5" },
        this.renderTd()
      );
    }
  }, {
    key: "_onChange",
    value: function _onChange() {
      if (this.mounted) {
        this.setState({
          columns: ColumnsStore.getVisible()
        });
      }
    }
  }]);

  return DataItem;
})(React.Component);

Object.assign(DataItem.prototype, cssMixins);
Object.assign(DataItem.prototype, textMixins);

module.exports = DataItem;
//# sourceMappingURL=data_item.js.map