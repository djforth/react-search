//Libraries
const React = require("react/addons");
const _     = require("lodash");

//Flux
const DataAction   = require('../actions/data_actions');
const ColumnsStore = require('../stores/columns_store');

//Components
const DataItem   = require('../components/data_item');

var Buttons = require('morse-bootstrap-react').Material;
const DeleteBtn  = Buttons.Delete;
const IconBtn    = Buttons.Icon;

class GenericItem extends DataItem {
  constructor(props) {
    super(props);
    this.active  = [{active:false}];
    this.mounted = false;
    this.removed = ["row", "tr", "vPad5", {hide:false}];
    this.state = {data:[], columns:[], removed:this.getClasses(this.removed)};
  }

  deleteCallBack(flash){
    this.removed  = this.toggleCss(this.removed);
    this.setState({removed:this.getClasses(this.removed)});
    DataAction.deleteItem(this.props.data.get("id"), flash);
    React.unmountComponentAtNode(this.getDOMNode().parentNode)
  }

  getToolTip(){
    let item = this.props.data;
    return item.get(this.props.tooltip);
  }

  renderTd(){

    let item = this.props.data;
    if(item && item != [] && this.state.columns){
        // if(item.toJS){
        //   console.log('item', item.toJS());
        // }

       let td = _.map(this.state.columns, function(col){
         if(col.key === "actions"){
           return (
            <ul className="actions" key="buttons">
              <li>
                <DeleteBtn
                  tooltip    = {`Delete ${this.getToolTip()}`}
                  callback   = {this.deleteCallBack.bind(this)}
                  delete_msg = {`Are you sure you want to delete ${this.getToolTip()}?`}
                  delete_api  = {this.setDeleteApi()}
                  key         = {_.uniqueId("delete")}
                  id          = {item.get("id")}
                />
              </li>
              <li>
                <IconBtn
                  icon = "edit"
                  key  = {_.uniqueId("edit")}
                  path = {this.setEditPath()}
                  title = {`Edit ${this.getToolTip()}`}
                  options ={{ button_type: "default", placement: "top"}}
                />
              </li>
            </ul>
            );
         } else {
          // console.log('Data',this.displayData(item, col));
          // console.log(col);
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

  setDeleteApi(){
    if(_.isString(this.props.delete)){
      return this.props.delete.replace(":id", this.props.data.get("id"));
    }

    return "";
  }

  setEditPath(){
    if(_.isString(this.props.delete)){
      return this.props.edit.replace(":id", this.props.data.get("id"));
    }

    return "";
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.props.data !== nextProps.data || this.state.columns !== nextState.columns ;
  }
}

module.exports = GenericItem;
