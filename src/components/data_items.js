//Libraries
const React = require("react/addons");
// const _     = require("lodash");

//Flux
const DataStore      = require("../stores/data_store");

//Components
const DataItem = require("./data_item");

// Morse Libraies
const ViewportDetect = require("viewport-detection-es6");


class DataItems extends React.Component {

  constructor(props) {
    super(props);
    this.active = [{active:false}];
    // this._select.bind(this);
    this.state = {data:[], keys:[], visible:[], device:"desktop"};
  }

  componentDidMount() {
    const detect = new ViewportDetect();
    let device   = detect.getDevice();
    // this.size  = detect.windowSize();

    this.setState({
      device:device,
      visible:this.props[device]
    });
    detect.trackSize((device, size)=>{
      if(this.state.device !== device){
        this.setState({
          device:device,
          visible:this.props[device]
        });
      }

      this.size   = size;

    });

    //Data Changers
    DataStore.addChangeListener("search", this._onSearch.bind(this));
    DataStore.addChangeListener("pagination", this._onPagination.bind(this));
    DataStore.addChangeListener("change", this._onChange.bind(this));
    DataStore.addChangeListener("fetched", this._onLoaded.bind(this));
  }

  componentWillUnmount() {
    DataStore.removeChangeListener("search", this._onSearch);
    DataStore.removeChangeListener("fetched", this._onLoaded);
    DataStore.removeChangeListener("change", this._onChange);
    DataStore.removeChangeListener("pagination", this._onPagination);
  }

  renderData(){
    if(this.state.data){

       let items = this.state.data.map(function(k){
         if(k){
          return (
            <DataItem css={this.props.css} data={k} keys={this.state.visible} key={k.get("id")} />
            );
         }

      }.bind(this));

      return items;
    }
  }

  render() {
    return (
      <div key="items">
        {this.renderData()}
      </div>

    );
  }

  _onChange(){
    this.setState({data:DataStore.paginationData()});
  }

  _onPagination() {
    this.setState({data:DataStore.paginationData()});
  }

  _onSearch() {
    this.setState({data:DataStore.getSearchData()});
  }

  _onLoaded(){
    this.setState({data:DataStore.getAll(), keys:DataStore.getKeys()});
  }
}

module.exports = DataItems;
