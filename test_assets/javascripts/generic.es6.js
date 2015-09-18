require("babelify/polyfill");

const React   = require("react/addons");
const Search  = require("../../index")
const Generic = Search.Generic.Search;

let columns = [
  {key:"id"},
  {key:"headline", desktop:true, mobile:true, tablet:true, searchable:true},
  {key:"boroughs", desktop:true, mobile:false, tablet:false, searchable:true},
  {key:"venues", desktop:true, mobile:false, tablet:false, searchable:true},
  {key:"published", desktop:true, mobile:false, tablet:false},
  {key:"created", desktop:true, mobile:false, tablet:true},
  {key:"status", desktop:true, mobile:true, tablet:true},
  {key:"actions", desktop:true, mobile:true, tablet:true}
];

let css = {
  actions:"col-lg-2 col-md-2 col-sm-2 col-xs-2",
  headline:"col-lg-5 col-md-5 col-sm-5 col-xs-5",
  default: "col-lg-1 col-md-1 col-sm-2 col-xs-2"};


let buttons = [
  {key:"delete", restful:"delete", title:{text:"Delete :replace", replace:"headline"}, delete_msg:{text:"Are you sure you want to delete - :replace ?", replace:"headline"},icon:"delete", text:"", options:{ button_type: "danger", placement: "top"}},
  {key:"edit", title:{text:"Edit :replace", replace:"headline"}, icon:"edit", text:"", options:{ button_type: "default", placement: "top"}}
]

let date_ranges = [
  {key:"published", type:"date"}
]

React.render(
  <Generic
    buttons     = {buttons}
    columns     = {columns}
    css         = {css}
    date_ranges = {date_ranges}
    dataApi   = "/api/generic/feed_news.json"
    filterApi = "/api/generic/filters_news.json"
  />,
  document.getElementById('search')
);
