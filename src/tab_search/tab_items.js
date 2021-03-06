//Libraries
const React = require("react");

//Morse Libraries
// const ViewportDetect = require("viewport-detection-es6");

//Flux
const TabsStore      = require("../stores/tabs_store");


//Components
const DataItems   = require("../vanilla_components/data_items");
const TabItem     = require("./tab_item");
// const GenericExpander = require("./generic_expander");
// const DataItem        = require("../components/data_item");

class TabItems extends DataItems {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();

    TabsStore.addChangeListener("tab_change", this._onSearch.bind(this));
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    TabsStore.removeChangeListener("tab_change", this._onSearch);
  }

  renderData(){

    if(this.state.data && this.state.data.size > 0){

       let items = this.state.data.map((k)=>{
         if(k){
            return (<TabItem {...this.props}
                data    = {k}
                key     = {k.get("id")}
              />);
         }

         return "";
      });

      return items;
    }

    // console.log(this.state.loading)
    if(this.state.data.size <= 0){
      return (
        <div className="loader" key="loader">
          <h5>{this.props.noresults}</h5>
        </div>
      );
    }
    return "";
  }
}

module.exports = TabItems;
