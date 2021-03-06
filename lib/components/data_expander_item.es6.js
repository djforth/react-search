//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require("lodash");

// Flux
var ReactSearch = require('react-search');
var DataStore = ReactSearch.Stores.Data;
var ColumnsStore = ReactSearch.Stores.Columns;
// const DataStore = require("../../stores/dataStore.es6.js");

//Components
var DataItem = require("../search/data_item.es6.js");
var Buttons = require('morse-bootstrap-react').Material;
var DeleteBtn = Buttons.Delete;
var IconBtn = Buttons.Icon;

// Mixins
var cssMixins = require("morse-react-mixins").css_mixins;
var textMixins = require("morse-react-mixins").text_mixins;

var DataExpanderItem = (function (_DataItem) {
  _inherits(DataExpanderItem, _DataItem);

  function DataExpanderItem(props) {
    _classCallCheck(this, DataExpanderItem);

    _get(Object.getPrototypeOf(DataExpanderItem.prototype), "constructor", this).call(this, props);
    this.active = [{ active: false }];
    this.answer = ["collapse", { "in": false }];
    this.chevron = ["glyphicon", { "glyphicon-chevron-up": false }, { "glyphicon-chevron-down": true }];
    this.state = {
      acc_css: this.getClasses(this.answer),
      active: this.getClasses(this.active),
      chevron: this.getClasses(this.chevron),
      css: "col-md-1",
      device: "desktop",
      selected: false,
      show_additional: false
    };
  }

  _createClass(DataExpanderItem, [{
    key: "_onClick",
    value: function _onClick(e) {
      e.preventDefault();
      var show = this.state.show_additional ? false : true;

      this.active = this.toggleCss(this.active);
      this.answer = this.toggleCss(this.answer);
      this.chevron = this.toggleCss(this.chevron);
      this.setState({
        acc_css: this.getClasses(this.answer),
        active: this.getClasses(this.active),
        chevron: this.getClasses(this.chevron),
        show_additional: show
      });
    }
  }, {
    key: "renderAll",
    value: function renderAll() {
      var _this = this;

      var data = this.state.data;

      if (data) {
        var _ret = (function () {
          var visible = ColumnsStore.getShowable();
          var included = _.pluck(visible, "key");

          var li = data.map(function (d, k) {
            if (_.includes(included, k)) {
              var title = _.find(visible, { key: k }).title;
              if (_.isDate(d)) {
                return React.createElement(
                  "li",
                  { className: "list-group-item col-md-4" },
                  React.createElement(
                    "strong",
                    null,
                    title,
                    ":"
                  ),
                  " ",
                  _this.displayData(data, { key: k })
                );
              } else if (_.isString(d) || _.isNumber(d)) {
                d = String(d);
                return React.createElement(
                  "li",
                  { className: "list-group-item col-md-4" },
                  React.createElement(
                    "strong",
                    null,
                    title,
                    ":"
                  ),
                  " ",
                  _this.capitalize(d)
                );
              }
            }
          });

          return {
            v: li
          };
        })();

        if (typeof _ret === "object") return _ret.v;
      }

      return "";
    }
  }, {
    key: "renderAdditional",
    value: function renderAdditional() {
      var additional = undefined;

      if (this.state.show_additional) {
        additional = React.createElement(
          "ul",
          { className: "list-group " + this.state.acc_css },
          this.renderAll()
        );
      } else {
        additional = "";
      }

      return additional;
    }
  }, {
    key: "renderShowButton",
    value: function renderShowButton() {
      var buttonText = undefined;

      if (this.state.active) {
        buttonText = "Less";
      } else {
        buttonText = "More";
      }
      // console.log('chevron', this.state.chevron);
      return React.createElement(
        "div",
        { className: this.props.css["default"] },
        React.createElement(
          "a",
          { href: "#", onClick: this._onClick.bind(this), className: "btn btn-info" },
          buttonText,
          "  ",
          React.createElement("i", { className: this.state.chevron })
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "tr " + this.state.active + " " + this.state.removed },
        React.createElement(
          "div",
          { className: "clearfix" },
          this.renderTd(),
          this.renderShowButton()
        ),
        this.renderAdditional()
      );
    }
  }]);

  return DataExpanderItem;
})(DataItem);

Object.assign(DataExpanderItem.prototype, cssMixins);

module.exports = DataExpanderItem;
//# sourceMappingURL=data_expander_item.es6.js.map