require("babelify/polyfill");

const React   = require("react/addons");
const Search  = require("../../index")
const Generic = Search.Generic.Search;

let columns = [
  // {key:"id"},
  // {key:"headline", desktop:true, mobile:true, tablet:true, searchable:true},
  // {key:"boroughs", desktop:true, mobile:false, tablet:false, searchable:true},
  // {key:"venues", desktop:true, mobile:false, tablet:false, searchable:true},
  // {key:"published", desktop:true, mobile:false, tablet:false},
  // {key:"created", desktop:true, mobile:false, tablet:true},
  // {key:"status", desktop:true, mobile:true, tablet:true},
  // {key:"actions", desktop:true, mobile:true, tablet:true}
  {key:"id"},
  {key:"title", desktop:true, mobile:true, tablet:true, searchable:true},
  {key:"local_authority", desktop:true, mobile:false, tablet:false, searchable:true},
  {key:"actions", title:"Actions", desktop:true, mobile:true, tablet:true}
];

let css = {
  title:"col-lg-4 col-md-4 col-sm-4 col-xs-4", staff:"col-lg-4 col-md-4 col-sm-4 col-xs-4",
  default: "col-lg-2 col-md-3 col-sm-4 col-xs-5"};


let buttons = [
  {key:"delete", restful:"delete", title:{text:"Delete :replace", replace:"headline"}, delete_msg:{text:"Are you sure you want to delete - :replace ?", replace:"title"},icon:"delete", text:"", options:{ button_type: "danger", placement: "top"}},
  {key:"edit", title:{text:"Edit :replace", replace:"title"}, icon:"edit", text:"", options:{ button_type: "default", placement: "top"}}
]

let date_ranges = []

React.render(
  <Generic
    buttons     = {buttons}
    columns     = {columns}
    css         = {css}
    expandable  = {false}
    date_ranges = {date_ranges}
    dataApi   = "/api/generic/feed.json"
    filterApi = "/api/generic/legacy_filters.json"
  />,
  document.getElementById('search')
);
