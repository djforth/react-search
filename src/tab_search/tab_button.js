const React = require("react/addons")
     , _    = require("lodash");

const cssMixins  = require("morse-react-mixins").css_mixins;

// const DataStore    = require("../stores/data_store");

// const Search       = require("../vanilla_components/search");
// const TabItems = require("./tab_items");

// var MorseBootstrap = require("morse-bootstrap-react");
// const FlashNotice  = MorseBootstrap.FlashNotice;

class TabButton extends React.Component {

  constructor(props) {
    super(props);
    let opts = props.tab.options
    this.tabCSS = opts.css.split(" ");
    this.tabCSS.push({active:opts.active});
    this.state = {css:this.getClasses(this.tabCSS)}
  }

  render(){
    return (
      <a href="#" onClick={this._tabClick.bind(this)} className={this.state.css} >
        {this.props.tab.title}
      </a>
    );
  }

  _tabClick(e){
    e.preventDefault();
    // let elm = React.findDOMNode(e.target);
    console.log("CLICK >>>> ", this.props.tab)
  }

}

Object.assign(TabButton.prototype, cssMixins);

module.exports = TabButton;
