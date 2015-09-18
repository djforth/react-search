//Libraries
const React = require("react/addons");
const _     = require("lodash");

const FilterActions = require("../actions/filter_actions");

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

let Calendar     = require('material-ui/lib/date-picker');
let DatePicker   = Calendar.DatePicker
let Styles       = require('material-ui/lib/styles');
let ThemeManager = new Styles.ThemeManager();

const textMixins = require("morse-react-mixins").text_mixins;


class FiltersDate extends React.Component {

  constructor(props) {
    super(props);
    // console.log('props', props);
    let date = new Date();
    let year = date.getFullYear();
    date.setFullYear(year - 100);
    this.start = _.clone(date);
    date.setFullYear(year + 100);
    this.end   = _.clone(date);
    this.state = {start:this.start, end:this.end}
  }

  // componentDidMount() {
  //   // DatePicker.focus()
  // }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }


  renderStart(){
    return (
      <div className="col-md-6 col-sm-6 col-xs-6">
        <label>Start Date</label>
        <DatePicker hintText="Select Start Date" onChange={this._handleFrom.bind(this)} autoOk={true} maxDate={this.state.end}  />
      </div>
    );
  }

  renderEnd(){
    return (
      <div className="col-md-6 col-sm-6 col-xs-6">
        <label>End Date</label>
        <DatePicker hintText="Select End Date" onChange={this._handleTo.bind(this)} autoOk={true} minDate={this.state.start} />
      </div>
    );
  }

  render(){
    return (
      <div className="form-group">
        <h6>{this.capitalize(this.props.date_range.key)}</h6>
        <div className="row">
          {this.renderStart()}
          {this.renderEnd()}
        </div>
      </div>
    );

  }

  _handleFrom(n, date){
    // console.log('change', date);
    this.start = date;
    this.setState({start:date})
    FilterActions.changeDate(
      this.props.date_range.key,
      date,
      "start"
    );
  }

  _handleTo(n, date){
    // console.log('change', date);
    this.end = date;
    this.setState({end:date});
    FilterActions.changeDate(
      this.props.date_range.key,
      date,
      "end"
    );
  }
}

Object.assign(FiltersDate.prototype, textMixins);

FiltersDate.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = FiltersDate;
