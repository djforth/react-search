const React           = require("react/addons");
const _               = require("lodash");

//Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;
const textMixins = require("morse-react-mixins").text_mixins;

class DataHead extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTh(){
    let th = _.map(this.props.keys, function(t, i){
      return (
        <div className={this.checkCss(this.props.css, t)} key={i}>
          {this.capitalize(t)}
        </div>
      );
    }.bind(this));

    return th;
  }

  render() {
    return (
      <div className="thead">
        <div className="tr">
          {this.renderTh()}
        </div>
      </div>
    );
  }
}

Object.assign(DataHead.prototype, cssMixins);
Object.assign(DataHead.prototype, textMixins);

module.exports = DataHead;
