//Libraries
const React   = require("react/addons");
const _ = require("lodash");

const DataActions    = require("../actions/data_actions");
const FilterStore    = require("../stores/filter_store");
const ColumnsStore   = require("../stores/columns_store");

//Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;
const textMixins = require("morse-react-mixins").text_mixins;

//Components
const Keys = require("./keys");

class SearchFilters extends React.Component{
  // mixins: [cssMixins, textMixins],

  constructor(props) {
    super(props);

    this.dropdown =  ["input-group-btn", {"open":false}];

    this.state = {
      dropdown:this.getClasses(this.dropdown),
      expanded:"false",
      selectedkey:"all"
    };
  }

  componentDidMount() {
    this.quickSearch = (_.isBoolean(this.props.quickSearch)) ? this.props.quickSearch : true;

    if(FilterStore.isSelectedKey(this.props.item)){
      this.active = [{active:true}];
      this.setState({active:this.getClasses(this.active)});
    }

    FilterStore.addChangeListener("change_key", this._openDropdown.bind(this));
    ColumnsStore.addChangeListener("adding", this._onAdd.bind(this));
  }

  componentWillUnmount() {
    FilterStore.removeChangeListener("change_key", this._openDropdown);
    ColumnsStore.removeChangeListener("adding", this._onAdd);
  }

  _onAdd(){
    console.log('keys', ColumnsStore.getSearchable());
    this.setState({
      keys:ColumnsStore.getSearchable()
    });
  }

  _onChange(e){
    if(this.quickSearch){
      if(this.loop){
        window.clearTimeout(this.loop);
      }

      this.loop = window.setTimeout((val)=>{
        if(val.length > 3 || val === ""){
          DataActions.searching(val);
        }
      }, 300, e.target.value);
    }

    // _.defer((val)=>{
    //   DataActions.searching(val);
    // }, e.target.value);
  }

  _openDropdown(){
    this.dropdown = this.toggleCss(this.dropdown);
    let expanded  = (this.state.expended === "true") ? "false" : "true";
    this.setState({
      dropdown:this.getClasses(this.dropdown),
      expanded:expanded,
      selectedkey:FilterStore.getSelectedKey()
    });
  }

  _preventSubmit(e){
    console.log("submiting", e);
    e.preventDefault();

  }

  renderKeys(){
    if(this.state.keys){
      let items = this.state.keys.map(function(k){
        return (<Keys item={k} key={_.uniqueId("key")} />);
        });

        return items;
    }
  }

  render() {
    return (
      <form onSubmit={this._preventSubmit.bind(this)}>
        <div className="row">
          <div className="col-lg-12">
              <div className="input-group vPad20">
                  <input type="text" className="form-control" placeholder="Search for..." onChange={this._onChange.bind(this)} />
                  <span className={this.state.dropdown}>
                      <button className="btn btn-primary" type="button"><span className="glyphicon glyphicon-search" aria-hidden="true">search</span></button>
                      <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded={this.state.expanded} onClick={this._openDropdown.bind(this)} >
                        {this.capitalize(this.state.selectedkey)}
                        &nbsp;<span className="caret"></span>
                        <span className="sr-only">Toggle Dropdown</span>
                      </button>
                      <ul className="dropdown-menu">
                        <Keys item={{key:"all", title:"All"}} />
                        <li role="separator" className="divider"></li>
                        {this.renderKeys()}
                      </ul>
                  </span>
              </div>
          </div>
        </div>
      </form>
    );
  }
}

Object.assign(SearchFilters.prototype, cssMixins);
Object.assign(SearchFilters.prototype, textMixins);

module.exports = SearchFilters;
