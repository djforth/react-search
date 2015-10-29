//Libraries
const React = require("react");

const FilterActions    = require("../actions/filter_actions");

//Mixins
const textMixins = require("morse-react-mixins").text_mixins;

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.setState({
      id:this.createId(
        this.props.filterBy,
        this.props.data.title,
        this.props.data.id
      ),
      value:this.props.data.id,
      title:this.props.data.title,
      selected:this.props.data.selected
    });
  }

  _onChecked(){
    let selected = (this.state.selected) ? false : true;
    this.setState({selected:selected});
    FilterActions.checkFilter(this.props.filterBy, String(this.state.value), selected);
  }

  render() {
    return (
      <label htmlFor={this.state.id} className="checkbox-inline">
        <input type="checkbox" value={this.state.value} id={this.state.id} checked={this.state.selected} onChange={this._onChecked.bind(this)} />
        {this.state.title}
      </label>
    );
  }
}

Object.assign(CheckBox.prototype, textMixins);

module.exports = CheckBox;
