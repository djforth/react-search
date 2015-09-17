//Libraries
const React = require("react/addons");
const _     = require("lodash");


//Mixins
const textMixins = require("morse-react-mixins").text_mixins;

var Buttons     = require('morse-bootstrap-react').Material;
const DeleteBtn = Buttons.Delete;
const IconBtn   = Buttons.Icon;

// let buttons = [
//   {key:"show", title:{text:"View Shopping Request for :replace", replace:"requester_name"}, icon:"tv", text:"", options:{ button_type: "default", placement: "top"}}
// ]

class ActionButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.config = _.map(this.props.config, (conf)=>{
      conf.type      = conf.type || "default";
      conf.title_str = this.setTitle(conf);
      conf.path      = this.getPath(conf.key);
      return conf;
    });
  }

  getPath(key){
    let btn = this.props.data.get("buttons");
    return btn.get(key);
  }

  renderButtons(){
    if(this.props.data){
      let btns = _.map(this.props.config, (config)=>{
        if(config.type === "delete"){
          return(<li>
            <DeleteBtn
              tooltip    = {config.title_str}
              callback   = {this.deleteCallBack.bind(this)}
              delete_msg = {`Are you sure you want to delete ${this.getToolTip()}?`}
              delete_api  = {this.setDeleteApi()}
              key         = {_.uniqueId("delete")}
              id          = {item.get("id")}
            />
          </li>);
        } else {
          return(<li>
            <IconBtn
              icon    = {config.icon}
              path    = {config.path}
              title   = {config.title_str}
              options = {config.options}
              key     = {_.uniqueId("action")}
            />
          </li>);
        }
      });

      return btns;
    }

    return "";
  }

  render(){
    return (
      <ul className="actions">
        {this.renderButtons()}
      </ul>
    );
  }
  // Best performance - http://jsperf.com/test-approach
  setTitle(config){
    let obj  = config.title
    let keys = _.remove(_.keys(obj), (k)=>{
      return k !== "text"
    });

    let title = obj.text;
    _.forEach(keys, (k)=>{
      let txt = this.props.data.get(obj[k])
      title = title.replace(`:${k}`, txt);
    })

    return title;
  }


}

module.exports = ActionButtons;
