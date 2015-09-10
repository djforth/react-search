const React           = require("react/addons");
// const PureRenderMixin = React.addons.PureRenderMixin;
const _               = require("lodash");

const DataStore      = require("../stores/data_store");
const ColumnsStore   = require("../stores/columns_store");

//Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;
const textMixins = require("morse-react-mixins").text_mixins;

class DataItem extends React.Component {
  constructor(props) {
    super(props);
    this.active = [{active:false}];
    // this._select.bind(this);
    this.state = {data:null, columns:[], datefield:[]};

  }

  componentDidMount() {
    this.mounted = true;
    this.setState({data:this.props.data, columns:ColumnsStore.getVisible()});

    ColumnsStore.addChangeListener("change", this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.mounted = false;
    ColumnsStore.removeChangeListener("change", this._onChange);
  }

  getFmt(col){

    if(_.has(col, "fmt")){
      return col.fmt;
    }

    if(_.has(col, "type") ){
      if(col.type === "dateTime"){
        return "%d/%m/%Y %H:%M";
      }
      if(col.type === "date"){
        return "%d/%m/%Y";
      }
    }

    return "%d/%m/%Y";
  }



  displayData(item, col){
    let key  = col.key;
    let data = item.get(col.key);
    if(_.isDate(data)){

      data = item.get(`${key}Df`);
      let fmt = this.getFmt(col);
      return data.formatDate(fmt);
    }

    return data;
  }

  renderTd(){

    let item = this.state.data;

    if(item && this.state.columns){

       let td = _.map(this.state.columns, function(col){

         return (
            <div className={this.checkCss(this.props.css, col.key)} key={_.uniqueId("dataItem")}>
              {this.displayData(item, col)}
            </div>
            );
      }.bind(this));

      return td;
    }
    return "";
  }


  render() {
    return (
      <div className="row tr vPad5">
        {this.renderTd()}
      </div>
    );
  }

  _onChange(){
    if(this.mounted){
      this.setState({
        columns:ColumnsStore.getVisible()
      });
    }

  }
}

Object.assign(DataItem.prototype, cssMixins);
Object.assign(DataItem.prototype, textMixins);

module.exports = DataItem;
