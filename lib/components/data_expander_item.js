"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react");
var _ = require("lodash");

// Flux
// const DataStore      = require("../stores/data_store");
var ColumnsStore = require("../stores/columns_store");

//Components
var DataItem = require("./data_item");
// const Buttons   = require("morse-bootstrap-react").Material;
// const DeleteBtn = Buttons.Delete;
// const IconBtn   = Buttons.Icon;

// Mixins
var cssMixins = require("morse-react-mixins").css_mixins;
// const textMixins = require("morse-react-mixins").text_mixins;

var DataExpanderItem = (function (_DataItem) {
  _inherits(DataExpanderItem, _DataItem);

  function DataExpanderItem(props) {
    _classCallCheck(this, DataExpanderItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DataExpanderItem).call(this, props));

    _this.active = [{ active: false }];
    _this.answer = ["collapse", { "in": false }];
    _this.chevron = ["glyphicon", { "glyphicon-chevron-up": false }, { "glyphicon-chevron-down": true }];
    _this.state = {
      acc_css: _this.getClasses(_this.answer),
      active: _this.getClasses(_this.active),
      chevron: _this.getClasses(_this.chevron),
      css: "col-md-1",
      device: "desktop",
      selected: false,
      show_additional: false
    };

    return _this;
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
      var _this2 = this;

      var data = this.props.data;

      if (data) {
        var visible = ColumnsStore.getShowable();
        // let included = _.pluck(visible, "key");

        var li = _.map(visible, function (col) {
          return _this2.renderItem(col, data);
        });

        return li;
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
    key: "renderItem",
    value: function renderItem(col, data) {
      // let title = _.find(visible, {key:key}).title
      return React.createElement(
        "li",
        { className: "list-group-item col-md-4" },
        React.createElement(
          "strong",
          null,
          col.title,
          ":"
        ),
        " ",
        this.displayData(data, col)
      );
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

      return React.createElement(
        "div",
        { className: this.props.css.default },
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
//# sourceMappingURL=data_expander_item.js.map