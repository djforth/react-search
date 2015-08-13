//Libraries
const React = require("react/addons");
const _     = require("lodash");

// const DataStore  = require("../stores/dataStore");

const FilterStore    = require("../stores/filter_store");

const DataActions    = require("../actions/data_actions");
const FilterActions = require("../actions/filter_actions");

//Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;
const textMixins = require("morse-react-mixins").text_mixins;

class Keys extends React.Component {
  componentDidMount() {
    if(FilterStore.isSelectedKey(this.props.item)){
      this.active = [{active:true}];
      this.setState({active:this.getClasses(this.active)});
    }

    FilterStore.addChangeListener("change_key", this._onChange.bind(this));
  }

  componentWillUnmount() {
    FilterStore.removeChangeListener("change_key", this._onChange);
  }

  constructor(props) {
    super(props);
    this.active = [{active:false}];
    this.state = {active:this.getClasses(this.active)};
  }

  _select(e){
    e.preventDefault();

    this.active = this.toggleCss(this.active);
    this.setState({active:this.getClasses(this.active)});
    FilterActions.changeKey(this.props.item.key);
    DataActions.keyUpdate();
  }

  _onChange(){
    if(FilterStore.isSelectedKey(this.props.item)){
      this.active = [{active:true}];
      this.setState({active:this.getClasses(this.active)});
    } else {
      this.active = [{active:false}];
      this.setState({active:this.getClasses(this.active)});
    }
  }

  render() {
    return (
      <li className={this.state.active} ><a href="#" onClick={this._select.bind(this)} key={_.uniqueId()}>{this.props.item.title}</a></li>
    );
  }
}

Object.assign(Keys.prototype, cssMixins);
Object.assign(Keys.prototype, textMixins);

module.exports = Keys;
