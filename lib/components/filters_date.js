"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react");
var _ = require("lodash");

var FilterActions = require("../actions/filter_actions");

var injectTapEventPlugin = require("react-tap-event-plugin");
var isBrowser = typeof global === "undefined";
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

    // console.log(context)

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FiltersDate).call(this, props, context));

    var date = new Date();
    var year = date.getFullYear();
    date.setFullYear(year - 100);
    _this.start = _.clone(date);
    date.setFullYear(year + 100);
    _this.end = _.clone(date);
    _this.state = { start: _this.start, end: _this.end, mounted: false };

    return _this;
  }

  // componentWillMount(){
  //   console.log('Will mount');
  // }

  _createClass(FiltersDate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // ThemeManager  = new Styles.ThemeManager();
      injectTapEventPlugin();
      // console.log("Mounting");
      // this.context = {muiTheme: ThemeManager.getCurrentTheme()}
      // this.context.muiTheme = ThemeManager.getCurrentTheme()
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
      // console.log("context")
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