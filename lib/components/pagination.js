"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react");
// const _     = require("lodash");
var Pagination = require("react-bootstrap/lib/Pagination");

var DataStore = require("../stores/data_store");
var DataActions = require("../actions/data_actions");

var PaginationHolder = (function (_React$Component) {
  _inherits(PaginationHolder, _React$Component);

  function PaginationHolder(props) {
    _classCallCheck(this, PaginationHolder);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PaginationHolder).call(this, props));

    _this.state = { activePage: 1, items: 0, maxButtons: 0, prevNext: false };
    return _this;
  }

  _createClass(PaginationHolder, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      DataStore.addChangeListener("search", this._onUpdate.bind(this));
      DataStore.addChangeListener("fetched", this._onUpdate.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      DataStore.removeChangeListener("search", this._onUpdate);
      DataStore.removeChangeListener("fetched", this._onUpdate);
    }
  }, {
    key: "_handleSelect",
    value: function _handleSelect(event, selectedEvent) {
      var active = selectedEvent.eventKey;
      this.setState({
        activePage: active
      });

      DataActions.pageChange(active);
    }
  }, {
    key: "_onUpdate",
    value: function _onUpdate() {
      var items = DataStore.getPagination();
      var prevNext = items > 0;
      var maxButtons = items <= 10 ? items : 10;
      if (this.mounted) {
        this.setState({
          activePage: 1,
          items: items,
          maxButtons: maxButtons,
          prevNext: prevNext
        });
      }
    }
  }, {
    key: "hidePagination",
    value: function hidePagination() {
      if (this.state.items === 1) {
        return "hidden";
      }

      return "";
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: this.hidePagination() },
        React.createElement(Pagination, {
          bsSize: "medium",
          items: this.state.items,
          prev: this.state.prevNext,
          next: this.state.prevNext,
          ellipsis: true,
          maxButtons: this.state.maxButtons,
          activePage: this.state.activePage,
          onSelect: this._handleSelect.bind(this) })
      );
    }
  }]);

  return PaginationHolder;
})(React.Component);

module.exports = PaginationHolder;
//# sourceMappingURL=pagination.js.map