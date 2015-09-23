//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

//Flux
var DataAction = require("../actions/data_actions");

//Mixins
var textMixins = require("morse-react-mixins").text_mixins;
var cssMixins = require("morse-react-mixins").css_mixins;

var Buttons = require("morse-bootstrap-react").Material;
var DeleteBtn = Buttons.Delete;
var IconBtn = Buttons.Icon;

var ActionButtons = (function (_React$Component) {
  _inherits(ActionButtons, _React$Component);

  function ActionButtons(props) {
    _classCallCheck(this, ActionButtons);

    _get(Object.getPrototypeOf(ActionButtons.prototype), "constructor", this).call(this, props);
  }

  _createClass(ActionButtons, [{
    key: "deleteCallBack",
    value: function deleteCallBack(flash) {
      // console.log('id', this.props.data.get("id"));
      DataAction.deleteItem(this.props.data.get("id"), { type: "notice" });
      // DataAction.deleteItem(this.props.data.get("id"), flash);
      if (_.isFunction(this.props.delete_cb)) {
        this.props.delete_cb(this.props.data.get("id"), flash);
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this = this;

      var config = _.map(this.props.config, function (conf) {
        if (!_this.props.data.get("buttons").has(conf.key)) {
          return "";
        }

        conf.restful = conf.restful || "get";
        if (conf.title) {
          conf.title_str = _this.setTitle(conf.title);
        }

        if (conf.delete_msg) {
          conf.delete_msg_str = _this.setTitle(conf.delete_msg);
        }
        conf.path = _this.getPath(conf.key);
        return conf;
      });

      this.setState({ config: config });
    }
  }, {
    key: "getPath",
    value: function getPath(key) {
      var btn = this.props.data.get("buttons");
      return btn.get(key);
    }
  }, {
    key: "renderButtons",
    value: function renderButtons() {
      var _this2 = this;

      if (this.props.data) {
        var btns = _.map(this.state.config, function (config) {
          if (config.path === "" || _.isNull(config.path)) {
            return "";
          }

          if (config.restful === "delete") {
            return React.createElement(
              "li",
              { key: _.uniqueId() },
              React.createElement(DeleteBtn, {
                callback: _this2.deleteCallBack.bind(_this2),
                delete_msg: config.delete_msg_str,
                delete_api: config.path,
                id: _this2.props.data.get("id"),
                key: _.uniqueId("delete"),
                options: config.options,
                size: "md-15",
                tooltip: config.title_str
              })
            );
          } else {
            return React.createElement(
              "li",
              { key: _.uniqueId() },
              React.createElement(IconBtn, {
                icon: config.icon,
                path: config.path,
                title: config.title_str,
                size: "md-15",
                options: config.options,
                key: _.uniqueId("action")
              })
            );
          }
        });

        return btns;
      }

      return "";
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "ul",
        { className: "actions" },
        this.renderButtons()
      );
    }

    // Best performance - http://jsperf.com/test-approach
  }, {
    key: "setTitle",
    value: function setTitle(obj) {
      var _this3 = this;

      var keys = _.remove(_.keys(obj), function (k) {
        return k !== "text";
      });

      var title = obj.text;
      _.forEach(keys, function (k) {
        var txt = _this3.props.data.get(obj[k]);
        title = title.replace(":" + k, txt);
      });

      return title;
    }
  }]);

  return ActionButtons;
})(React.Component);

Object.assign(ActionButtons.prototype, cssMixins);
Object.assign(ActionButtons.prototype, textMixins);

module.exports = ActionButtons;
//# sourceMappingURL=action_buttons.js.map