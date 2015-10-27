//Libraries
const React = require("react/addons");
const _     = require("lodash");

//Flux
// const DataStore      = require("../../stores/dataStore");
const FilterStore   = require("../stores/filter_store");
const FilterActions = require("../actions/filter_actions");
const DataActions   = require("../actions/data_actions");

//Components
const SearchFilter  = require("./searchfilter");

//Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;

class Filters extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    //Data Changers
    FilterStore.addChangeListener("change", this._onUpdate.bind(this));
    FilterStore.addChangeListener("fetched", this._onUpdate.bind(this));

    //Get Data
    FilterActions.fetchFilters(this.props.filterApi);
  }

  componentWillUnmount() {
    FilterStore.removeChangeListener("change", this._onUpdate);
    FilterStore.removeChangeListener("fetched", this._onUpdate);
  }


  render() {

    return (
      <div className="search-filter">
        <SearchFilter key="SearchFilter" />
      </div>
    );
  }

  _onUpdate() {
    this.setState({filters:FilterStore.getAll()});
  }
}

Object.assign(Filters.prototype, cssMixins);

module.exports = Filters;
