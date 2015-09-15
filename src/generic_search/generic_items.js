//Libraries
const React = require("react/addons");

//Morse Libraries
const ViewportDetect = require("viewport-detection-es6");

//Components
const DataItems   = require('../components/data_items');
const GenericItem = require("./generic_item");
const DataItem    = require('../components/data_item');

class GenericItems extends DataItems {

  constructor(props) {
    super(props);
  }

  renderData(){
    if(this.state.data && this.state.data.size > 0){
       let items = this.state.data.map((k)=>{
         if(k){
          return (
            <GenericItem
              css     = {this.props.css}
              data    = {k}
              delete  = {this.props.delete}
              edit    = {this.props.edit}
              keys    = {this.state.visible}
              key     = {k.get("id")}
              tooltip = {this.props.tooltip}
              buttons = {this.props.buttons}
            />
            );
         }

         return "";
      });

      return items;
    }

    // console.log(this.state.loading)
    if(this.state.data.size <= 0){
      return (
        <div className="loader">
          <h5>Nothing Matches your search</h5>
        </div>
      );
    }
    return "";
  }
}

module.exports = GenericItems;
