//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

var FilterActions = require("../actions/filter_actions");

var injectTapEventPlugin = require("react-tap-event-plugin");

var Calendar = require("material-ui/lib/date-picker");
var DatePicker = Calendar.DatePicker;

// const ThemeManager = require('material-ui/lib/styles/theme-manager')();
// console.log('ThemeManager', ThemeManager);
var Styles = require("material-ui/lib/styles");
var ThemeManager = undefined; //  = new Styles.ThemeManager();

var textMixins = require("morse-react-mixins").text_mixins;

var FiltersDate = (function (_React$Component) {
  _inherits(FiltersDate, _React$Component);

  function FiltersDate(props, context) {
    _classCallCheck(this, FiltersDate);

    _get(Object.getPrototypeOf(FiltersDate.prototype), "constructor", this).call(this, props, context);
    // console.log(context)
    var date = new Date();
    var year = date.getFullYear();
    date.setFullYear(year - 100);
    this.start = _.clone(date);
    date.setFullYear(year + 100);
    this.end = _.clone(date);
    this.state = { start: this.start, end: this.end, mounted: false };
  }

  _createClass(FiltersDate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      injectTapEventPlugin();
      this.setState({ mounted: true });
    }
  }, {
    key: "componentWillUnMount",
    value: function componentWillUnMount() {
      this.setState({ mounted: false });
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      ThemeManager = new Styles.ThemeManager();
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    }
  }, {
    key: "renderStart",
    value: function renderStart() {
      if (this.state.mounted) {
        return React.createElement(
          "div",
          { className: "col-md-6 col-sm-6 col-xs-6" },
          React.createElement(
            "label",
            null,
            "Start Date"
          ),
          React.createElement(DatePicker, { hintText: "Select Start Date", onChange: this._handleFrom.bind(this), autoOk: true, maxDate: this.state.end })
        );
      }

      return "";
    }
  }, {
    key: "renderEnd",
    value: function renderEnd() {
      if (this.state.mounted) {
        return React.createElement(
          "div",
          { className: "col-md-6 col-sm-6 col-xs-6" },
          React.createElement(
            "label",
            null,
            "End Date"
          ),
          React.createElement(DatePicker, { hintText: "Select End Date", onChange: this._handleTo.bind(this), autoOk: true, minDate: this.state.start })
        );
      }

      return "";
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "h6",
          null,
          this.capitalize(this.props.date_range.key)
        ),
        React.createElement(
          "div",
          { className: "row" },
          this.renderStart(),
          this.renderEnd()
        )
      );
    }
  }, {
    key: "_handleFrom",
    value: function _handleFrom(n, date) {
      this.start = date;
      this.setState({ start: date });
      FilterActions.changeDate(this.props.date_range.key, date, "start");
    }
  }, {
    key: "_handleTo",
    value: function _handleTo(n, date) {
      this.end = date;
      this.setState({ end: date });
      FilterActions.changeDate(this.props.date_range.key, date, "end");
    }
  }]);

  return FiltersDate;
})(React.Component);

Object.assign(FiltersDate.prototype, textMixins);
FiltersDate.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = FiltersDate;
//# sourceMappingURL=filters_date.js.map