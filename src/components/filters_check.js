//Libraries
const React = require("react/addons");
// const _     = require("lodash");

//Component
const CheckBox = require("./check_box");

class FiltersChecks extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFiltersOpts(){
      if(this.props.filter) {
        let filterBy = this.props.filter.getDetails("filterBy");
        let opts  = this.props.filter.getAll();
        let items = opts.map(function(f){
          return (<CheckBox data={f.toJS()} filterBy={filterBy} key={`checkbox${f.get("id")}`} />);
        });

        return items;
      }

  }

  render() {
    let title = this.props.filter.getDetails("title");
    return (
      <div className="form-group">
        <label>{title}</label>
        <div className="checkbox filter-options">
          {this.renderFiltersOpts()}
        </div>
      </div>
    );
  }
}

module.exports = FiltersChecks;
