require("babelify/polyfill");

const React   = require("react/addons");
const Search  = require("../../index")
const Generic = Search.Generic.Search;

let columns = [
  {key:"id"},
  {key:"region", title:"Region", searchable:true},
  {key:"requester_name", title:"Requested By", desktop:true, mobile:false, tablet:true, searchable:true},
  {key:"request_made", title:"Request made on", type:"date", fmt:"%b %d, %Y at %H:%M", searchable:true},
  {key:"required_by", title:"Required by", type:"dateTime", fmt:"%b %d, %Y", desktop:true, mobile:true, tablet:true, searchable:true},
  {key:"request_made", title:"Request made on", fmt:"%b %d, %Y at %H:%M", searchable:true},
  {key:"return_at", title:"Return", type:"dateTime", fmt:"%b %d, %Y"},
  {key:"samples_count", title:"Samples"},
  {key:"delivery_user", title:"Delivery Contact"},
  {key:"delivery_contact_email", title:"Delivery Contact Email", type:"email_button"},
  {key:"expected_returned", fmt:"%b %d, %Y", searchable:true},
  {key:"actual_returned", fmt:"%b %d, %Y"},
  {key:"status", desktop:true, tablet:true, mobile:true,searchable:true},
  {key:"company", desktop:true, searchable:true},
  {key:"actions", title:"Actions", desktop:true, mobile:true, tablet:true}
];

let css = {actions:"col-lg-4 col-md-4 col-sm-5 col-xs-5", default: "col-lg-2 col-md-3 col-sm-4 col-xs-5"};

let buttons = [
  {key:"show", title:{text:"View Shopping Request for :replace", replace:"requester_name"}, icon:"tv", text:"", options:{ button_type: "default", placement: "top"}}
]

React.render(
  <Generic
    buttons   = {buttons}
    columns   = {columns}
    css       = {css}
    tooltip   = "requester_name"
    dataApi   = "/api/date/feed.json"
    filterApi = "/api/date/filter.json"

  />,
  document.getElementById('search')
);

