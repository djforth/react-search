"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require("lodash");
var DataManager = require("datamanager");

var DataFcty = (function (_DataManager) {
  _inherits(DataFcty, _DataManager);

  function DataFcty() {
    _classCallCheck(this, DataFcty);

    _get(Object.getPrototypeOf(DataFcty.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(DataFcty, [{
    key: "init",
    value: function init() {
      this.cache = {};
      this.pagination = 50;
      this.page = 1;
      this.itemNo = 0;
      this.current_search = null;
    }
  }, {
    key: "checkDataIds",
    value: function checkDataIds(d) {
      if (_.isArray(d)) {
        return !_.isEmpty(d);
      } else {
        return _.isNumber(d);
      }
    }
  }, {
    key: "addSelected",
    value: function addSelected(ids) {
      if (this.checkDataIds(ids)) {
        this.addToHistory();
        this.data = this.data.map(function (d) {
          var selected = false;
          var id = d.get("id");
          if (_.isArray(ids)) {
            selected = _.contains(ids, id);
          } else {
            selected = ids === id;
          }

          d = d.set("selected", selected);
          return d;
        });
      }
    }
  }, {
    key: "setApi",
    value: function setApi(uri) {
      this.url = uri;
    }
  }, {
    key: "checkCache",
    value: function checkCache(val, keys) {
      if (_.isEmpty(this.cache)) {
        return false;
      }
      // console.log(this.cache)
      return this.cache.text === val && _.difference(keys, this.cache.keys).length === 0;
    }
  }, {
    key: "checkFilters",
    value: function checkFilters(opts, filter) {
      // let check = false;
      // _.forEach(filters, (filter)=>{
      // console.count()
      var selected = this.getIds(filter.selected);
      var ids = opts.get(filter.filter_by);

      return this.checkIds(selected, ids);
    }
  }, {
    key: "checkIds",
    value: function checkIds(selected, ids) {
      if (_.isArray(ids)) {
        if (_.intersection(selected, ids).length > 0) {
          return true;
        }
      } else if (_.include(selected, ids)) {
        return true;
      }

      return false;
    }
  }, {
    key: "checkCacheFilters",
    value: function checkCacheFilters(filters) {
      var _this = this;

      if (!this.cache.filters) {
        return false;
      }

      // f = this.cache.filters
      var check = true;
      _.forEach(filters, (function (f) {
        var cached = _.find(_this.cache.filters, function (c) {
          return c.filter_by === f.filter_by;
        });

        if (!f.selected.equals(cached.selected)) {
          check = false;
        }
      }).bind(this));

      return check;
    }
  }, {
    key: "filterSearch",
    value: function filterSearch(filters) {
      var _this2 = this;

      this.cache.filters = filters;
      filters = _.where(filters, { all: false });
      var search = this.data;

      if (filters.length > 0) {
        _.forEach(filters, (function (filter) {
          search = search.filter((function (d) {
            return _this2.checkFilters(d.get("filters"), filter);
          }).bind(_this2));
        }).bind(this));
      }

      this.cache.filterSearch = search;
      return search;
    }
  }, {
    key: "filterByIds",
    value: function filterByIds(ids) {
      if (this.data) {
        return this.data.filter(function (d) {
          // console.log(ids, d.get("id"));
          return _.contains(ids, Number(d.get("id")));
        });
      }
      return null;
    }
  }, {
    key: "getIds",
    value: function getIds(selected) {
      var ids = selected.map(function (s) {
        return s.get("id");
      });

      return ids.toJS();
    }
  }, {
    key: "getSearch",
    value: function getSearch(data, val, keys) {
      var _this3 = this;

      //Do search
      var regex = new RegExp(val, "i");
      var search = data.filter((function (d) {
        return _this3.searchTxt(regex, d, keys);
      }).bind(this));

      this.cache.text = val;
      this.cache.keys = keys;
      this.cache.search = search;

      return search;
    }
  }, {
    key: "getValues",
    value: function getValues(data, keys) {
      if (keys.length > 1) {
        var all = data.filter(function (v, k) {
          return _.contains(keys, k);
        });
        return all.valueSeq().toJS().join(" ");
      } else {
        return data.get(keys);
      }
    }
  }, {
    key: "searchTxt",
    value: function searchTxt(regex, data, keys) {
      var values = this.getValues(data, keys);

      if (values) {
        return String(values).search(regex) > -1;
      }

      return true;
    }
  }, {
    key: "search",
    value: function search(val, keys, filters) {
      var search = undefined;
      if (this.checkCache(val, keys) && this.checkCacheFilters(filters)) {
        return this.cache.fullSearch;
      }
      //Runs filters over data
      search = this.checkCacheFilters(filters) ? this.cache.filterSearch : this.filterSearch(filters);

      //Runs Search over data
      if (!_.isEmpty(val)) {
        search = this.getSearch(search, val, keys);
      }

      this.cache.fullSearch = search; // Caches search
      return search;
    }
  }]);

  return DataFcty;
})(DataManager);

module.exports = DataFcty;
//# sourceMappingURL=data_fcty.js.map