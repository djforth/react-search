//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

//Flux
var DataStore = require('../stores/data_store');
var ColumnsStore = require('../stores/columns_store');

//Components
var DataItem = require('../components/data_item');

var Buttons = require("../components/action_buttons");

var GenericItem = (function (_DataItem) {
  _inherits(GenericItem, _DataItem);

  // componentDidMount() {
  //   super.componentDidMount();
  //   DataStore.addChangeListener("delete", this._deleteCallBack.bind(this));
  // }

  // componentWillUnmount() {
  //   super.componentWillUnmount();
  //   DataStore.removeChangeListener("delete", this._deleteCallBack);
  // }

  function GenericItem(props) {
    _classCallCheck(this, GenericItem);

    _get(Object.getPrototypeOf(GenericItem.prototype), "constructor", this).call(this, props);
    this.active = [{ active: false }];
    this.mounted = false;
    this.removed = ["row", "tr", "vPad5", { hide: false }];
    this.state = { data: [], columns: [], removed: this.getClasses(this.removed) };
  }

  _createClass(GenericItem, [{
    key: "_deleteCallBack",
    value: function _deleteCallBack(id, flash) {
      // console.debug("id", id);
      // console.log("this.removed", this.removed)
      this.removed = this.toggleCss(this.removed);
      this.setState({ removed: this.getClasses(this.removed) });
      React.unmountComponentAtNode(this.getDOMNode().parentNode);
    }

    // getToolTip(){
    //   let item = this.props.data;
    //   return item.get(this.props.tooltip);
    // }

  }, {
    key: "renderAction",
    value: function renderAction() {
      return React.createElement(Buttons, { data: this.props.data, config: this.props.buttons, delete_cb: this._deleteCallBack.bind(this) });
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
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: this.state.removed },
        this.renderTd()
      );
    }

    // setDeleteApi(){
    //   if(_.isString(this.props.delete)){
    //     return this.props.delete.replace(":id", this.props.data.get("id"));
    //   }

    //   return "";
    // }

    // setEditPath(){
    //   if(_.isString(this.props.delete)){
    //     return this.props.edit.replace(":id", this.props.data.get("id"));
    //   }

    //   return "";
    // }

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.data !== nextProps.data || this.state.columns !== nextState.columns || this.state.removed !== nextState.removed;
    }
  }]);

  return GenericItem;
})(DataItem);

module.exports = GenericItem;
//# sourceMappingURL=generic_item.js.map