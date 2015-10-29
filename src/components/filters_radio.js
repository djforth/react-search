//Libraries
const React = require("react");
const _     = require("lodash");

// const FilterStore      = require("../../stores/filterStore");
// const DataActions    = require("../../actions/data_actions");

const FilterActions    = require("../actions/filter_actions");

//Mixins
const textMixins = require("morse-react-mixins").text_mixins;



class FiltersRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected:null};
  }

  checkSelected(id){
    return this.state.selected === id;
  }

  _onChange(e){
    let val = e.target.value;
    let filterBy = this.props.filter.getDetails("filterBy");

    this.setState({selected:Number(val)});
    FilterActions.selectFilter(filterBy, val);
  }

  renderFiltersOpts(){
      if(this.props.filter) {
        let opts     = this.props.filter.getAll();
        let filterBy = this.props.filter.getDetails("filterBy");
        let items = opts.map(function(f){
          return (<label className="radio-inline" key={f.get("id")}>
              <input value={f.get("id")} name={filterBy} type="radio" onChange={this._onChange.bind(this)} checked={this.checkSelected(f.get("id"))} key={_.uniqueId("radio")} />
              <span key={_.uniqueId("title")}>{f.get("title")}</span>
            </label>);
        }.bind(this));

        return items;
      }

  }

  render() {
    let title = this.props.filter.getDetails("title");

    return (
      <div className="form-group">
        <label key={_.uniqueId("radio-group-label")}>{title}</label>
        <div className="radio radio-group" key={_.uniqueId("radio-group")}>{this.renderFiltersOpts()}</div>
      </div>
    );
  }
}

Object.assign(FiltersRadio.prototype, textMixins);

module.exports = FiltersRadio;
