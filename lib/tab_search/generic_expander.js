//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

//Flux
// const DataAction   = require("../actions/data_actions");
// const ColumnsStore = require("../stores/columns_store");

//Components
var DataExpander = require("../components/data_expander_item");

var Buttons = require("../components/action_buttons");

var GenericExpander = (function (_DataExpander) {
  _inherits(GenericExpander, _DataExpander);

  function GenericExpander() {
    _classCallCheck(this, GenericExpander);

    _get(Object.getPrototypeOf(GenericExpander.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(GenericExpander, [{
    key: "renderAction",
    value: function renderAction() {
      return React.createElement(Buttons, { data: this.props.data, config: this.props.buttons, delete_cb: this._deleteCallBack.bind(this) });
    }
  }, {
    key: "_deleteCallBack",
    value: function _deleteCallBack() {
      this.removed = this.toggleCss(this.removed);
      this.setState({ removed: this.getClasses(this.removed) });
      // React.unmountComponentAtNode(this.getDOMNode().parentNode)
    }
  }, {
    key: "renderTd",
    value: function renderTd() {
      var item = this.props.data;
      if (item && this.state.columns) {
        var td = _.map(this.state.columns, (function (col) {
          var key = col.key;
          if (key === "actions") {
            return React.createElement(
              "div",
              { className: this.checkCss(this.props.css, key) },
              this.renderAction()
            );
          }

          return this.renderColumn(col, item);
        }).bind(this));

        return td;
      }
      return "";
    }
  }, {
    key: "render",
    value: function render() {
      // console.log("props", this.props)
      return React.createElement(
        "div",
        { className: "tr " + this.state.active },
        React.createElement(
          "div",
          { className: "clearfix" },
          this.renderTd(),
          this.renderShowButton()
        ),
        this.renderAdditional()
      );
    }

    // shouldComponentUpdate(nextProps, nextState){
    //   return this.props.data !== nextProps.data || this.state.columns !== nextState.columns || this.state.removed !== nextState.removed;
    // }
  }]);

  return GenericExpander;
})(DataExpander);

module.exports = GenericExpander;
//# sourceMappingURL=generic_expander.js.map