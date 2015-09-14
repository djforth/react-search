require("babelify/polyfill");

const React   = require("react/addons");
const Search  = require("../../index")
const Generic = Search.Generic.Search;

let columns = [
  {key:"id"},
  {key:"title", desktop:true, mobile:true, tablet:true, searchable:true},
  {key:"local_authority", desktop:true, mobile:true, tablet:true, searchable:true},
  {key:"county", desktop:true, mobile:false, tablet:true, searchable:true},
  {key:"town", desktop:true, mobile:false, tablet:false, searchable:true},
  {key:"actions", title:"Actions", desktop:true, mobile:true, tablet:true}
];

let css = {title:"col-lg-4 col-md-4 col-sm-5 col-xs-5", default: "col-lg-2 col-md-3 col-sm-4 col-xs-5"};


React.render(
  <Generic
    columns   = {columns}
    css       = {css}
    tooltip   = "title"
    dataApi   = "/api/generic/feed.json"
    filterApi = "/api/generic/filter.json"
    edit      = "/schools/:id/edit"
    delete    =  "/schools/:id"
  />,
  document.getElementById('search')
);
