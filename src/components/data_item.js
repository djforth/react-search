const React           = require("react/addons");
// const PureRenderMixin = React.addons.PureRenderMixin;
const _               = require("lodash");

const DataStore      = require("../stores/data_store");

//Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;
const textMixins = require("morse-react-mixins").text_mixins;

class DataItem extends React.Component {
  constructor(props) {
    super(props);
    this.active = [{active:false}];
    // this._select.bind(this);
    this.state = {data:null};

  }

  componentDidMount() {
    this.setState({data:this.props.data});
  }

  renderTd(){

    let item = this.state.data;

    if(item){

       let td = _.map(this.props.keys, function(k){

         return (
            <div className={this.checkCss(this.props.css, k)} key={_.uniqueId("dataItem")}>
              {item.get(k)}
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
}

Object.assign(DataItem.prototype, cssMixins);
Object.assign(DataItem.prototype, textMixins);

module.exports = DataItem;
