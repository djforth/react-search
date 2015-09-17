//Libraries
const React = require("react/addons");
const _     = require("lodash");

//Flux
const DataAction   = require('../actions/data_actions');
const ColumnsStore = require('../stores/columns_store');

//Components
const DataExpander = require('../components/data_expander_item');

var Buttons     = require("../components/action_buttons");

class GenericExpander extends DataExpander {
  renderAction(){
    return (
      <Buttons data={this.props.data} config={this.props.buttons} />
    );
  }

  renderTd(){
    let item = this.props.data;
    if(item && this.state.columns){
       let td = _.map(this.state.columns, function(col){
        let key = col.key;
        if(key === "actions"){
          return <div className={this.props.css.default}>{this.renderAction()}</div>
        }

        return this.renderColumn(col, item)
      }.bind(this));

      return td;
    }
    return "";
  }

  render() {
    console.log("props", this.props)
    return (
      <div className={`tr ${this.state.active}`}>
        <div className="clearfix">
          {this.renderTd()}
          {this.renderShowButton()}
        </div>
        {this.renderAdditional()}
      </div>

    );
  }
}

module.exports = GenericExpander;
