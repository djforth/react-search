//Libraries
const React = require("react");
const _     = require("lodash");

//Flux
// const DataStore      = require("../../stores/dataStore");
const FilterStore   = require("../stores/filter_store");
const FilterActions = require("../actions/filter_actions");
const DataActions   = require("../actions/data_actions");

//components
const FiltersCheck  = require("./filters_check");
var isBrowser = typeof global === "undefined";
const FiltersDate   = require("./filters_date");
const FiltersSelect = require("./filters_select");
const FiltersRadio  = require("./filters_radio");

const SearchFilter  = require("./searchfilter");

//Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;


class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.chevron =  ["glyphicon", {"glyphicon-chevron-up":true}, {"glyphicon-chevron-down":false}];
    this.panel     = ["panel-body", "collapse", {"in":false}];
    this.state = {filters:null, chevron: this.getClasses(this.chevron), panel:this.getClasses(this.panel)};
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

  renderDateRanges(){
    let dr = "";
    if(this.props.date_ranges){
      dr = _.map(this.props.date_ranges, (date_range)=>{
        return (<FiltersDate date_range = {date_range} key={_.uniqueId("dates")} />);
      });

    }

    return dr;
  }

  renderFilters(){
    if(this.state.filters){
      let items = _.map(this.state.filters, function(f){
      let elm;
      switch(f.getDetails("input_type")){
        case "checkbox":
          elm = <FiltersCheck filter={f} key={_.uniqueId("check")} />;
        break;

        case "radio":
          elm = <FiltersRadio filter={f} key={_.uniqueId("radio")} />;
        break;

        default:
          elm = <FiltersSelect filter={f} key={_.uniqueId("select")} />;
      }

        return elm;
      });

      return items;
    }

  }


  render() {

    return (
      <div className="search-filter">
        <SearchFilter key="SearchFilter" />
        <div className="panel panel-default">
          <div className="panel-heading">
            Filters
            <a href="#" className="pull-right clickable" onClick={this._onClick.bind(this)} >
              <i className={this.state.chevron}> </i>
            </a>
          </div>
          <div className={this.state.panel}>
            {this.renderDateRanges()}
            {this.renderFilters()}
            <div className="pad20 clearfix">
              <button type="button" onClick={this._onFilter} className="btn btn-success pull-right"><span className="glyphicon glyphicon-plus"></span> Add Filters</button>
            </div>
          </div>

        </div>
      </div>);
  }

  _onFilter(e){
    e.preventDefault();
    DataActions.filterChange();
  }

  _onClick(e){
    e.preventDefault();

    this.chevron = this.toggleCss(this.chevron);
    this.panel   = this.toggleCss(this.panel);

    this.setState({chevron:this.getClasses(this.chevron), panel:this.getClasses(this.panel)});
  }


  _onUpdate() {
    this.setState({filters:FilterStore.getAll()});
  }

  // _onLoaded(){
  //   this.setState({filters:FilterStore.getAll()});

  // }

}

Object.assign(Filters.prototype, cssMixins);

module.exports = Filters;
