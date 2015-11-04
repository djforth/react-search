"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react");
// const _     = require("lodash");

//Component
var CheckBox = require("./check_box");

var FiltersChecks = (function (_React$Component) {
  _inherits(FiltersChecks, _React$Component);

  function FiltersChecks(props) {
    _classCallCheck(this, FiltersChecks);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FiltersChecks).call(this, props));
  }

  _createClass(FiltersChecks, [{
    key: "renderFiltersOpts",
    value: function renderFiltersOpts() {
      var _this2 = this;

      if (this.props.filter) {
        var _ret = (function () {
          var filterBy = _this2.props.filter.getDetails("filterBy");
          var opts = _this2.props.filter.getAll();
          var items = opts.map(function (f) {
            return React.createElement(CheckBox, { data: f.toJS(), filterBy: filterBy, key: "checkbox" + f.get("id") });
          });

          return {
            v: items
          };
        })();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var title = this.props.filter.getDetails("title");
      return React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "label",
          null,
          title
        ),
        React.createElement(
          "div",
          { className: "checkbox filter-options" },
          this.renderFiltersOpts()
        )
      );
    }
  }]);

  return FiltersChecks;
})(React.Component);

module.exports = FiltersChecks;
//# sourceMappingURL=filters_check.js.map