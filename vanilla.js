

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

const Filters      = require("./lib/vanilla_components/filters");
const Search       = require("./lib/vanilla_components/search");
const SearchFilter = require("./lib/vanilla_components/searchfilters");
//
exports.Components = {
  // CheckBox     : CheckBox,
  // DataHead     : DataHead,
  // DataItem     : DataItem,
  // DataItems    : DataItems,
  Filters      : Filters,
  // FilterCheck  : FilterCheck,
  // FilterRadio  : FilterRadio,
  // FilterSelect : FilterSelect,
  // Keys         : Keys,
  // Pagination   : Pagination,
  Search       : Search,
  SearchFilter : SearchFilter
}

// const GenericExpander  = require("./lib/generic_search/generic_expander");
// const GenericItem   = require("./lib/generic_search/generic_item");
// const GenericItems  = require("./lib/generic_search/generic_items");
const VanillaSearch = require("./lib/vanilla_search/vanilla_search");

exports.Generic = {
  // Expander : GenericExpander,
  // Items    : GenericItems,
  // Item     : GenericItem,
  Search   : VanillaSearch
}

const TabSearch = require("./lib/tab_search/tab_search");

exports.Tab = {
  // Expander : GenericExpander,
  // Items    : GenericItems,
  // Item     : GenericItem,
  Search   : TabSearch
}