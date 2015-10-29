//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

// //Flux
// const DataStore    = require("../stores/data_store");
var ColumnsStore = require("../stores/columns_store");

//Components
var DataItem = require("../vanilla_components/data_item");

var Buttons = require("../vanilla_components/action_buttons");

var GenericItem = (function (_DataItem) {
  _inherits(GenericItem, _DataItem);

  function GenericItem(props) {
    _classCallCheck(this, GenericItem);

    _get(Object.getPrototypeOf(GenericItem.prototype), "constructor", this).call(this, props);
    this.active = [{ active: false }];
    this.mounted = false;
    // this.removed = ["row", "tr", "vPad5", {hide:false}];
    this.state = { data: [], columns: [] };
  }

  _createClass(GenericItem, [{
    key: "renderAction",
    value: function renderAction() {
      return React.createElement(Buttons, { data: this.props.data, config: this.props.buttons });
    }
  }, {
    key: "renderAdditional",
    value: function renderAdditional() {
      var item = this.props.data;
      var list = ColumnsStore.getNonLabeled();
      if (item && item !== [] && list) {
        // let list = ColumnsStore.getLabeled();

        var td = _.map(list, (function (col) {
          if (col.key === "actions") {
            return React.createElement(
              "div",
              { className: this.checkCss(this.props.css, col.key), key: _.uniqueId() },
              this.renderAction()
            );
          } else {
            return React.createElement(
              "div",
              { className: this.checkCss(this.props.css, col.key), key: _.uniqueId() },
              this.displayData(item, col)
            );
          }
        }).bind(this));

        return td;
      }
      return "";
    }
  }, {
    key: "renderLi",
    value: function renderLi() {
      var item = this.props.data;
      var list = ColumnsStore.getLabeled();
      if (item && item !== [] && list) {
        // let list = ColumnsStore.getLabeled();

        var lis = _.map(list, (function (col) {
          if (col.key === "actions") {
            return React.createElement(
              "li",
              { className: this.checkCss(this.props.css, col.key), key: _.uniqueId() },
              this.renderAction()
            );
          } else {
            return React.createElement(
              "li",
              { className: this.checkCss(this.props.css, col.key), key: _.uniqueId() },
              React.createElement(
                "strong",
                null,
                col.title,
                ":"
              ),
              this.displayData(item, col)
            );
          }
        }).bind(this));

        return lis;
      }
      return "";
    }
  }, {
    key: "render",
    value: function render() {
      var key = ColumnsStore.getHeadline().key;
      var headline = this.props.data.get(key);

      return React.createElement(
        "article",
        { className: "job-item" },
        React.createElement(
          "h1",
          { className: "osw-r gamma up-c" },
          headline
        ),
        React.createElement(
          "ul",
          { className: "description" },
          this.renderLi()
        ),
        this.renderAdditional()
      );
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.data !== nextProps.data || this.state.columns !== nextState.columns;
    }
  }]);

  return GenericItem;
})(DataItem);

module.exports = GenericItem;
//# sourceMappingURL=tab_item.js.map