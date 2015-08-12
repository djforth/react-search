

// Actions
const ColumsActions = require("./lib/actions/columns_actions");
const DataActions   = require("./lib/actions/data_actions");
const FilterActions = require("./lib/actions/filter_actions");

exports.Actions = {
  Columns : ColumsActions,
  Data    : DataActions,
  Filters : FilterActions
}

// Dispatchers
const ColumnsDispatcher   = require("./lib/dispatcher/columns_dispatcher");
const DataDispatcher   = require("./lib/dispatcher/data_dispatcher");
const FilterDispatcher = require("./lib/dispatcher/filter_dispatcher");

exports.Dispatcher = {
  Columns : ColumnsDispatcher,
  Data    : DataDispatcher,
  Filters : FilterDispatcher
}

// Factories
const DataFactory   = require("./lib/factories/data_fcty");
const FilterFactory = require("./lib/factories/filters_fcty");

exports.Factories = {
  Data    : DataFactory,
  Filters : FilterFactory
}

// Stores
const ColumnsStores = require("./lib/stores/columns_store");
const DataStores    = require("./lib/stores/data_store");
const FilterStores  = require("./lib/stores/filter_store");

exports.Stores = {
  Columns : ColumnsStores,
  Data    : DataStores,
  Filters : FilterStores
}

// Compontents
const CheckBox     = require("./lib/components/check_box");
const DataHead     = require("./lib/components/data_head");
const DataItems    = require("./lib/components/data_items");
const DataItem     = require("./lib/components/data_item");
const Filters      = require("./lib/components/filters");
const FilterCheck  = require("./lib/components/filters_check");
const FilterRadio  = require("./lib/components/filters_radio");
const FilterSelect = require("./lib/components/filters_select");
const Keys         = require("./lib/components/keys");
const Pagination   = require("./lib/components/pagination");
const Search       = require("./lib/components/search");
const SearchFilter = require("./lib/components/searchfilter");


exports.Components = {
  CheckBox     : CheckBox,
  DataHead     : DataHead,
  DataItem     : DataItem,
  DataItems    : DataItems,
  Filters      : Filters,
  FilterCheck  : FilterCheck,
  FilterRadio  : FilterRadio,
  FilterSelect : FilterSelect,
  Keys         : Keys,
  Pagination   : Pagination,
  Search       : Search,
  SearchFilter : SearchFilter
}

