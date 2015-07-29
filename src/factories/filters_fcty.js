//Libraries
const Immutable = require("immutable");
const _         = require("lodash");

//Morse Libraries
const AjaxPromises = require("ajax-es6-module");
const DataManager  = require("datamanager");

class FiltersFcty extends DataManager {

  constructor(title, filter_by, filter_opts, input_type="checkbox"){
    super();
    this.ajaxPromises = new AjaxPromises();
    this.data         = null;

    this.history  = [];
    this.keys     = null;
    this.cid      = _.uniqueId("filter");

    this.details   = Immutable.fromJS({title:title, filterBy:filter_by, input_type:input_type});

    this.defaults     = (input_type === "checkbox") ? {selected:true} : {selected:false};

    if (filter_opts) {
      this.add(filter_opts);
    }

  }

  getDetails(key){
    if(key){
      return this.details.get(key);
    }
    return "";
  }

  hasDetails(key, val){
    return this.details.get(key) === val;
  }

  getSelected(all=false){
    let selected;
    if(all){
      selected = this.data;
    } else {
      selected = this.data.filter((d)=>{
        return d.get("selected");
      });
    }

    return {filter_by: this.details.get("filterBy"), selected:selected, all:(selected.size === this.data.size)};
  }

  setApi(uri){
    this.url = uri;
  }

  setSelected(id, value=true, reset=false){

    this.addToHistory();
    this.data = this.data.map((d)=>{
      switch(id) {
        case String(d.get("id")):
          d = d.set("selected", value);
          break;
        case "all":
          d = d.set("selected", value);
          break;
        default:
          if(reset){
            d = d.set("selected", !value);
          }
          break;
      }

      return d;
    });

  }



}

module.exports = FiltersFcty;
