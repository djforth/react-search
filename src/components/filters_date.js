//Libraries
const React = require("react/addons");
const _     = require("lodash");

const FilterActions = require("../actions/filter_actions");

var injectTapEventPlugin = require("react-tap-event-plugin");
var isBrowser = typeof global === "undefined";
let Calendar     = require("material-ui/lib/date-picker");
let DatePicker   = Calendar.DatePicker;

// const ThemeManager = require('material-ui/lib/styles/theme-manager')();
// console.log('ThemeManager', ThemeManager);
let Styles       = require("material-ui/lib/styles");
let ThemeManager; //  = new Styles.ThemeManager();

const textMixins = require("morse-react-mixins").text_mixins;


class FiltersDate extends React.Component {

  constructor(props, context) {
    super(props, context);
    // console.log(context)
    let date = new Date();
    let year = date.getFullYear();
    date.setFullYear(year - 100);
    this.start = _.clone(date);
    date.setFullYear(year + 100);
    this.end   = _.clone(date);
    this.state = {start:this.start, end:this.end, mounted:false};

  }

  componentWillMount(){
    console.log('Will mount');
  }

  componentDidMount(){
    // ThemeManager  = new Styles.ThemeManager();
    injectTapEventPlugin();
    // console.log("Mounting");
    // this.context = {muiTheme: ThemeManager.getCurrentTheme()}
    // this.context.muiTheme = ThemeManager.getCurrentTheme()
    this.setState({mounted:true});
  }

  componentWillUnMount(){
    this.setState({mounted:false});
  }


  getChildContext() {
    ThemeManager  = new Styles.ThemeManager();
    // console.log("context")
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  renderStart(){
    if(this.state.mounted) {
      return (
        <div className="col-md-6 col-sm-6 col-xs-6">
          <label>Start Date</label>
          <DatePicker hintText="Select Start Date" onChange={this._handleFrom.bind(this)} autoOk={true} maxDate={this.state.end}  />
        </div>
      );
    }

    return "";
  }

  renderEnd(){
    if(this.state.mounted) {
      return (
          <div className="col-md-6 col-sm-6 col-xs-6">
            <label>End Date</label>
            <DatePicker hintText="Select End Date" onChange={this._handleTo.bind(this)} autoOk={true} minDate={this.state.start} />
          </div>
        );
    }

    return "";
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
    this.start = date;
    this.setState({start:date});
    FilterActions.changeDate(
      this.props.date_range.key,
      date,
      "start"
    );
  }

  _handleTo(n, date){
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
