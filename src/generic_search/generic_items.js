//Libraries
const React = require("react");

//Morse Libraries
// const ViewportDetect = require("viewport-detection-es6");

//Components
const DataItems       = require("../components/data_items");
const GenericItem     = require("./generic_item");
const GenericExpander = require("./generic_expander");
// const DataItem        = require("../components/data_item");

class GenericItems extends DataItems {

  constructor(props) {
    super(props);
  }

  renderData(){

    if(this.state.data && this.state.data.size > 0){

       let items = this.state.data.map((k)=>{
         if(k){
          if(this.props.expandable){
            return (
              <GenericExpander {...this.props}
                data    = {k}
                key     = {k.get("id")}
              />
              );
          } else {
            return (<GenericItem {...this.props}
                data    = {k}
                key     = {k.get("id")}
              />);
          }

         }

         return "";
      });

      return items;
    }

    // console.log(this.state.loading)
    if(this.state.data.size <= 0){
      return (
        <div className="loader" key="loader">
          <h5>Nothing Matches your search</h5>
        </div>
      );
    }
    return "";
  }
}

module.exports = GenericItems;
