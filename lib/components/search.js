//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

//Flux
// const DataStore      = require("../stores/data_store");
var DataActions = require("../actions/data_actions");
var FilterActions = require("../actions/filter_actions");

// Morse Libraies
var ViewportDetect = require("viewport-detection-es6");

//Components
var DataHead = require("./data_head");
var Filters = require("./filters");
var Pagination = require("./pagination");

var Search = (function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search(props) {
    _classCallCheck(this, Search);

    _get(Object.getPrototypeOf(Search.prototype), "constructor", this).call(this, props);
    this.active = [{ active: false }];
    // this._select.bind(this);
    this.state = { data: [], keys: [], visible: [], device: "desktop" };
  }

  _createClass(Search, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var detect = new ViewportDetect();
      var device = detect.getDevice();
      this.size = detect.windowSize();

      this.setState({
        device: device,
        loading: true,
        loading_txt: "Starting data load",
        percent: 0,
        visible: this.props[device]
      });
      detect.trackSize((function (device, size) {
        if (this.state.device !== device) {
          this.setState({
            device: device,
            visible: this.props[device]
          });
        }

        this.size = size;
      }).bind(this));

      //Adds Keys
      FilterActions.setKeys(this.props.searchable);

      //Get Data
      this.setLoading();
      // DataStore.setApi(this.props.dataApi);
      // DataStore.fetchData();
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(event, selectedEvent) {
      this.setState({
        activePage: selectedEvent.eventKey
      });
    }
  }, {
    key: "loading",
    value: function loading() {
      if (this.state.loading) {
        return React.createElement(
          "div",
          { className: "loader" },
          React.createElement(
            "h5",
            null,
            this.state.loading_txt
          ),
          React.createElement(ProgressBar, { label: "Loading Data", now: this.state.percent, key: "loader" })
        );
      } else {
        return "";
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Filters, { filterApi: this.props.filterApi, keys: this.props.searchable, key: "filters" }),
        React.createElement(DataHead, { device: this.state.device, keys: this.state.visible, css: this.props.css, key: _.uniqueId("samplehead") }),
        this.props.children,
        React.createElement(Pagination, { key: _.uniqueId("pagination") })
      );
    }
  }, {
    key: "setLoading",
    value: function setLoading() {
      var _this = this;

      var FakeLoading = window.setInterval(function () {
        if (_this.percent < 50) {
          _this.percent++;
        }

        _this.setState({ percent: _this.percent, loading: true, loading_txt: "Waiting for Server to respond" });
      }, 1000);

      //Get Data
      DataActions.fetchData(function (p) {
        clearInterval(FakeLoading);
        if (p.percent >= 100) {
          _this.setState({ loading: false, percent: p.percent });
        } else {
          _this.percent = _this.percent > p.percent ? _this.percent : p.percent;
          _this.setState({ percent: _this.percent, loading_txt: "Loading Data" });
        }
      }, this.props.dataApi);
    }
  }]);

  return Search;
})(React.Component);

module.exports = Search;
//# sourceMappingURL=search.js.map