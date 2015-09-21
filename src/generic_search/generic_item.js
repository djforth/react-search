//Libraries
const React = require("react/addons");
const _     = require("lodash");

//Flux
// const DataStore    = require("../stores/data_store");
// const ColumnsStore = require("../stores/columns_store");

//Components
const DataItem   = require("../components/data_item");

var Buttons     = require("../components/action_buttons");

class GenericItem extends DataItem {

  constructor(props) {
    super(props);
    this.active  = [{active:false}];
    this.mounted = false;
    this.removed = ["row", "tr", "vPad5", {hide:false}];
    this.state = {data:[], columns:[], removed:this.getClasses(this.removed)};
  }

  renderAction(){
    return (
      <Buttons data={this.props.data} config={this.props.buttons} />
    );
  }

  renderTd(){

    let item = this.props.data;
    if(item && item !== [] && this.state.columns){

       let td = _.map(this.state.columns, function(col){
         if(col.key === "actions"){
           return (<div className={this.checkCss(this.props.css, col.key)} key={_.uniqueId()}>{this.renderAction()}</div>);

         } else {
           return (
            <div className={this.checkCss(this.props.css, col.key)} key={_.uniqueId()}>
              {this.displayData(item, col)}
            </div>
            );
         }
      }.bind(this));

      return td;
    }
    return "";
  }

  render() {
    return (
      <div className={this.state.removed}>
        {this.renderTd()}
      </div>

    );
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.props.data !== nextProps.data || this.state.columns !== nextState.columns;
  }
}

module.exports = GenericItem;
