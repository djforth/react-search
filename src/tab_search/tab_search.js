//Libraries
const React = require("react/addons")
     , _    = require("lodash");

const DataStore    = require("../stores/data_store");

const Search     = require("../vanilla_components/search");
const TabItems   = require("./tab_items");
const TabButton  = require("./tab_button")

// var MorseBootstrap = require("morse-bootstrap-react");
// const FlashNotice  = MorseBootstrap.FlashNotice;

class TabSearch extends React.Component {

  constructor(props) {
    super(props);
  }

  _renderIntro(){
    if(this.props.intro){
      return (
        <p className="intro" key="intro">{this.props.intro}</p>
      );
    }

    return ""
  }

  _renderTabs(){

    if(this.props.tabs){
      let tabs = _.map(this.props.tabs, (tab, i)=>{
        return (<li  key={`tabList${i}`}>
            <TabButton tab={tab} />
          </li>)
      });

      return tabs
    }

    return ""
  }

  render() {
    console.log("tabs", this.props.tabs)
    return (
      <div className="search">
        <ul className="tabs">
          {this._renderTabs()}
        </ul>
        <div className="search-body">
          {this._renderIntro()}
          <Search {...this.props} >
            <h2 className="osw-r up-c gamma sub">Or browse all Jobs... </h2>
            <TabItems {...this.props} key = "GenericItems" />
          </Search>
        </div>
      </div>
    );
  }

  _tabClick(e){
    e.preventDefault();
    let elm = React.findDOMNode(e.target);
    console.log("CLICK >>>> ", elm)
  }

}

module.exports = TabSearch;

