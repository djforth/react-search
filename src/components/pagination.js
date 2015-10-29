//Libraries
const React = require("react");
// const _     = require("lodash");
const Pagination = require("react-bootstrap/lib/Pagination");

const DataStore   = require("../stores/data_store");
const DataActions = require("../actions/data_actions");

class PaginationHolder extends React.Component{

  constructor(props) {
    super(props);
    this.state = {activePage:1, items:0, maxButtons:0, prevNext:false};
  }

  componentDidMount() {
    this.mounted = true;
    DataStore.addChangeListener("search", this._onUpdate.bind(this));
    DataStore.addChangeListener("fetched", this._onUpdate.bind(this));
  }

  componentWillUnmount() {
    this.mounted = false;
    DataStore.removeChangeListener("search", this._onUpdate);
    DataStore.removeChangeListener("fetched", this._onUpdate);
  }

  _handleSelect(event, selectedEvent){
    let active = selectedEvent.eventKey;
    this.setState({
      activePage: active
     });

    DataActions.pageChange(active);
  }

  _onUpdate(){
    let items      = DataStore.getPagination();
    let prevNext   = items > 0;
    let maxButtons =  (items <= 10) ?  items : 10;
    if(this.mounted){
      this.setState({
        activePage:1,
        items:items,
        maxButtons:maxButtons,
        prevNext:prevNext
      });
    }
  }

  hidePagination(){
    if(this.state.items === 1){
      return "hidden";
    }

    return "";
  }

  render() {
    return (
      <div className={this.hidePagination()}>
        <Pagination
          bsSize="medium"
          items={this.state.items}
          prev={this.state.prevNext}
          next={this.state.prevNext}
          ellipsis={true}
          maxButtons={this.state.maxButtons}
          activePage={this.state.activePage}
          onSelect={this._handleSelect.bind(this)} />
      </div>
    );

  }
}

module.exports = PaginationHolder;
