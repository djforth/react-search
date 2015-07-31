//Libraries
const React = require("react/addons");
const _     = require("lodash");
// const cx    = require("classnames");

//Flux
// const DataStore      = require("../../stores/dataStore");
const FilterStore = require("../stores/filter_store");
const DataActions = require("../actions/data_actions");

//components
const FiltersCheck  = require("./filters_check");
const FiltersSelect = require("./filters_select");
const FiltersRadio  = require("./filters_radio");
const SearchFilter  = require("./searchfilter");

//Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;


class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.chevron =  ["glyphicon", {"glyphicon-chevron-up":true}, {"glyphicon-chevron-down":false}];
    this.panel     = ["panel-body", {"hide":true}];
    this.state = {filters:null, chevron: this.getClasses(this.chevron), panel:this.getClasses(this.panel)};
  }

  componentDidMount() {

    //Data Changers
    FilterStore.addChangeListener("change", this._onChange.bind(this));
    FilterStore.addChangeListener("fetched", this._onLoaded.bind(this));

    //Get Data
    // console.log("filterApi", this.props.filterApi)
    FilterStore.setApi(this.props.filterApi);
    FilterStore.fetchData();
  }

  componentWillUnmount() {
    FilterStore.removeChangeListener("change", this._onChange);
    FilterStore.removeChangeListener("fetched", this._onLoaded);
  }

  renderFilters(){

    if(this.state.filters){
      // console.log("filterStore",this.state.filters.toJS());
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
        <SearchFilter keys={this.props.keys} key="SearchFilter" />
        <div className="panel panel-default">
          <div className="panel-heading">
            Filters
            <a href="#" className="pull-right clickable" onClick={this._onClick.bind(this)} >
              <i className={this.state.chevron}> </i>
            </a>
          </div>
          <div className={this.state.panel}>
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


  _onChange() {
    this.setState({filters:FilterStore.getAll()});
  }

  _onLoaded(){
    this.setState({filters:FilterStore.getAll()});

  }

}

Object.assign(Filters.prototype, cssMixins);

module.exports = Filters;
