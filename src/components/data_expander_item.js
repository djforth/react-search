//Libraries
const React = require("react/addons");
const _     = require("lodash");

// Flux
// const DataStore      = require("../stores/data_store");
const ColumnsStore   = require("../stores/columns_store");


//Components
const DataItem  = require("./data_item");
const Buttons   = require('morse-bootstrap-react').Material;
const DeleteBtn = Buttons.Delete;
const IconBtn   = Buttons.Icon;

// Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;
const textMixins = require("morse-react-mixins").text_mixins;

class DataExpanderItem extends DataItem {
  constructor(props) {
    super(props);
    this.active = [{active: false}];
    this.answer = ["collapse", {"in": false}];
    this.chevron = ["glyphicon", {"glyphicon-chevron-up": false}, {"glyphicon-chevron-down": true}];
    this.state = {
      acc_css: this.getClasses(this.answer),
      active: this.getClasses(this.active),
      chevron: this.getClasses(this.chevron),
      css: "col-md-1",
      device: "desktop",
      selected: false,
      show_additional: false
    };

  }

  _onClick(e) {
    e.preventDefault();
    let show = (this.state.show_additional) ? false : true;

    this.active  = this.toggleCss(this.active);
    this.answer  = this.toggleCss(this.answer);
    this.chevron = this.toggleCss(this.chevron);
    this.setState({
      acc_css         : this.getClasses(this.answer),
      active          : this.getClasses(this.active),
      chevron         : this.getClasses(this.chevron),
      show_additional : show
    });

  }

  renderAll() {
    let data = this.props.data;

    if(data) {
      let visible  = ColumnsStore.getShowable();
      console.log('visible', visible);
      let included = _.pluck(visible, "key");

      let li = _.map(visible, (col) => {
        return this.renderItem(col, data);
      });

      return li;
    }

    return "";
  }

  renderAdditional() {
    let additional;

    if(this.state.show_additional) {
      additional = (
        <ul className={`list-group ${this.state.acc_css}`}>
          {this.renderAll()}
        </ul>
      );

    } else {
      additional = "";
    }

    return additional;
  }

  renderItem(col, data){
    // let title = _.find(visible, {key:key}).title
    return <li className="list-group-item col-md-4"><strong>{col.title}:</strong> {this.displayData(data, col)}</li>;
  }

  renderShowButton() {
    let buttonText;

    if(this.state.active) {
      buttonText = "Less";
    } else {
      buttonText = "More";
    }
    // console.log('chevron', this.state.chevron);
    return (
      <div className={this.props.css.default}>
        <a href="#" onClick={this._onClick.bind(this)} className="btn btn-info">
          {buttonText} &nbsp;
          <i className={this.state.chevron}></i>
        </a>
      </div>
    );
  }

  render() {
    return (
      <div className={`tr ${this.state.active} ${this.state.removed}`}>
        <div className="clearfix">
          {this.renderTd()}
          {this.renderShowButton()}
        </div>
        {this.renderAdditional()}
      </div>
    );
  }

}

Object.assign(DataExpanderItem.prototype, cssMixins);

module.exports = DataExpanderItem;