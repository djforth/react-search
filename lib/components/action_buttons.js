//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

//Mixins
var textMixins = require("morse-react-mixins").text_mixins;

var Buttons = require('morse-bootstrap-react').Material;
var DeleteBtn = Buttons.Delete;
var IconBtn = Buttons.Icon;

// let buttons = [
//   {key:"show", title:{text:"View Shopping Request for :replace", replace:"requester_name"}, icon:"tv", text:"", options:{ button_type: "default", placement: "top"}}
// ]

var ActionButtons = (function (_React$Component) {
  _inherits(ActionButtons, _React$Component);

  function ActionButtons(props) {
    _classCallCheck(this, ActionButtons);

    _get(Object.getPrototypeOf(ActionButtons.prototype), "constructor", this).call(this, props);
  }

  _createClass(ActionButtons, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this = this;

      this.props.config = _.map(this.props.config, function (conf) {
        conf.type = conf.type || "default";
        conf.title_str = _this.setTitle(conf);
        conf.path = _this.getPath(conf.key);
        return conf;
      });
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
        var btns = _.map(this.props.config, function (config) {
          if (config.type === "delete") {
            return React.createElement(
              "li",
              null,
              React.createElement(DeleteBtn, {
                tooltip: config.title_str,
                callback: _this2.deleteCallBack.bind(_this2),
                delete_msg: "Are you sure you want to delete " + _this2.getToolTip() + "?",
                delete_api: _this2.setDeleteApi(),
                key: _.uniqueId("delete"),
                id: item.get("id")
              })
            );
          } else {
            return React.createElement(
              "li",
              null,
              React.createElement(IconBtn, {
                icon: config.icon,
                path: config.path,
                title: config.title_str,
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
    value: function setTitle(config) {
      var _this3 = this;

      var obj = config.title;
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

module.exports = ActionButtons;
//# sourceMappingURL=action_buttons.js.map