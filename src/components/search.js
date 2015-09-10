//Libraries
const React = require("react/addons");
const _     = require("lodash");


//Flux
// const DataStore      = require("../stores/data_store");
const DataActions    = require("../actions/data_actions");
const FilterActions  = require("../actions/filter_actions");
const ColumnsActions = require("../actions/columns_actions");

const ColumnsStore  = require("../stores/columns_store");
const DataStore     = require("../stores/data_store");
const FilterStore   = require("../stores/filter_store");

// Morse Libraies
const ViewportDetect = require("viewport-detection-es6");


//Components
const DataHead    =  require("./data_head");
const Filters     =  require("./filters");
const Pagination  = require("./pagination");
const ProgressBar = require("react-bootstrap/lib/ProgressBar.js");

class Search extends React.Component{

  constructor(props) {
    super(props);
    this.active = [{active:false}];
    this.percent = 0;
    this.state = {data:[], keys:[], visible:[], device:"desktop"};
  }


  componentDidMount() {
    const detect = new ViewportDetect();
    this.device = detect.getDevice();
    this.size  = detect.windowSize();
    let colsId = ColumnsActions.addingColumns(this.props.columns);
    ColumnsActions.changeDevice(this.device);
    this.setState({
      // device:device,
      loading:true,
      loading_txt:"Starting data load",
      percent: 0,
      colsId:colsId
      // visible:this.props[device]
    });
    detect.trackSize(function(device, size){
      if(this.device !== device){
        this.device =  device;
        ColumnsActions.changeDevice(device);
        // this.setState({
        //   device:device,
        //   visible:this.props[device]
        // });
      }

      this.size   = size;

    }.bind(this));

    //Adds Keys
    let keys = ColumnsStore.getSearchable();
    FilterActions.setKeys(_.pluck(keys, "key"));

    this.setLoading();
  }


  handleSelect(event, selectedEvent){
    this.setState({
      activePage: selectedEvent.eventKey
    });
  }

  loading(){
    if(this.state.loading){
      return (
        <div className="loader">
          <h5>{this.state.loading_txt}</h5>
          <ProgressBar label="Loading Data" now={this.state.percent} key={"loader"} />
        </div>
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <div>
        <Filters filterApi={this.props.filterApi} keys={this.props.searchable} key={"filters"} />
        <DataHead device={this.state.device} keys={this.state.visible} css={this.props.css} key={_.uniqueId("samplehead")} />
        {this.loading()}
        { this.props.children }
        <Pagination key={_.uniqueId("pagination")} />
      </div>
    );
  }

  setLoading(){

    let FakeLoading = window.setInterval(()=>{
      if(this.percent < 50){
        this.percent++;
      }

      this.setState({percent:this.percent, loading:true, loading_txt:"Waiting for Server to respond"});
    }, 1000);

    //Get Data
    DataActions.fetchData((p)=>{
      clearInterval(FakeLoading);
      if(p.percent >= 100){
        this.setState({loading:false, percent:p.percent});
      } else {
        this.percent = (this.percent > p.percent) ? this.percent : p.percent;
        this.setState({percent:this.percent, loading_txt:"Loading Data"});
      }
    }, this.props.dataApi);
  }

}

module.exports = Search;
