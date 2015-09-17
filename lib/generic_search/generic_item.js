//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

//Flux
var DataAction = require('../actions/data_actions');
var ColumnsStore = require('../stores/columns_store');

//Components
var DataItem = require('../components/data_item');

var Buttons = require('morse-bootstrap-react').Material;
var DeleteBtn = Buttons.Delete;
var IconBtn = Buttons.Icon;

var GenericItem = (function (_DataItem) {
  _inherits(GenericItem, _DataItem);

  function GenericItem(props) {
    _classCallCheck(this, GenericItem);

    _get(Object.getPrototypeOf(GenericItem.prototype), "constructor", this).call(this, props);
    this.active = [{ active: false }];
    this.mounted = false;
    this.removed = ["row", "tr", "vPad5", { hide: false }];
    this.state = { data: [], columns: [], removed: this.getClasses(this.removed) };
  }

  _createClass(GenericItem, [{
    key: "deleteCallBack",
    value: function deleteCallBack(flash) {
      this.removed = this.toggleCss(this.removed);
      this.setState({ removed: this.getClasses(this.removed) });
      DataAction.deleteItem(this.props.data.get("id"), flash);
      React.unmountComponentAtNode(this.getDOMNode().parentNode);
    }
  }, {
    key: "getToolTip",
    value: function getToolTip() {
      var item = this.props.data;
      return item.get(this.props.tooltip);
    }
  }, {
    key: "renderTd",
    value: function renderTd() {

      var item = this.props.data;
      if (item && item != [] && this.state.columns) {
        // if(item.toJS){
        //   console.log('item', item.toJS());
        // }

        var td = _.map(this.state.columns, (function (col) {
          if (col.key === "actions") {
            return React.createElement(
              "ul",
              { className: "actions", key: "buttons" },
              React.createElement(
                "li",
                null,
                React.createElement(DeleteBtn, {
                  tooltip: "Delete " + this.getToolTip(),
                  callback: this.deleteCallBack.bind(this),
                  delete_msg: "Are you sure you want to delete " + this.getToolTip() + "?",
                  delete_api: this.setDeleteApi(),
                  key: _.uniqueId("delete"),
                  id: item.get("id")
                })
              ),
              React.createElement(
                "li",
                null,
                React.createElement(IconBtn, {
                  icon: "edit",
                  key: _.uniqueId("edit"),
                  path: this.setEditPath(),
                  title: "Edit " + this.getToolTip(),
                  options: { button_type: "default", placement: "top" }
                })
              )
            );
          } else {
            // console.log('Data',this.displayData(item, col));
            // console.log(col);
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
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: this.state.removed },
        this.renderTd()
      );
    }
  }, {
    key: "setDeleteApi",
    value: function setDeleteApi() {
      if (_.isString(this.props["delete"])) {
        return this.props["delete"].replace(":id", this.props.data.get("id"));
      }

      return "";
    }
  }, {
    key: "setEditPath",
    value: function setEditPath() {
      if (_.isString(this.props["delete"])) {
        return this.props.edit.replace(":id", this.props.data.get("id"));
      }

      return "";
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
//# sourceMappingURL=generic_item.js.map