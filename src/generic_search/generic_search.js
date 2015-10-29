//Libraries
const React = require("react");

const DataStore    = require("../stores/data_store");

const Search       = require("../components/search");
const GenericItems = require("./generic_items");

var MorseBootstrap = require("morse-bootstrap-react");
const FlashNotice  = MorseBootstrap.FlashNotice;

class GenericSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {flash:null};
  }

  componentDidMount() {
    DataStore.addChangeListener("delete", this._onDelete.bind(this));
  }

  componentWillUnmount() {
    DataStore.removeChangeListener("delete", this._onDelete);
  }

  renderFlash(){
    if(this.state.flash){
      return (
        <FlashNotice type={this.state.flash.type}>
          {this.state.flash.msg}
        </FlashNotice>
      );
    }
  }

  render() {
    return (
      <div className="serach">
        {this.renderFlash()}
        <Search {...this.props} >
          <GenericItems {...this.props} key = "GenericItems" />
        </Search>
      </div>
    );
  }

   _onDelete(){
      this.setState({flash:DataStore.getFlash()});
   }
}

module.exports = GenericSearch;

