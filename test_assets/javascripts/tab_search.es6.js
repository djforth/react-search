require("babel-polyfill");
const React    = require("react");
const ReactDOM = require("react-dom");
const Search  = require("../../vanilla");
const Tab = require("../../lib/tab_search/tab_search")
//Search.Tab.Search;

let columns = [
  {key:"id"},
  {key:"title", title:"Title"},
  {key:"visible_from_date", title:"Posted", type:"date", fmt:"%b %d, %Y",},
  {key:"visible_until_date", title:"Closing", type:"date", fmt:"%b %d, %Y"},
  {key:"with_accommodation", title:"Live in"},
  {key:"shift"},
  {key:"job_start_date", title:"Start Date", type:"date", fmt:"%b %d, %Y"},
  {key:"summary", type:"date", fmt:"%b %d, %Y"},
  {key:"actions"}
];

columns = columns.map((c)=>{
  if(c.key !== "id"){
    c.desktop = true;
    c.mobile  = true;
    c.tablet  = true;
    c.searchable = true;
    c.show    = true;
  }

  switch(c.key){
    case "id":
      c.show = false
    break;
    case "title":
      c.headline = true;
    break;
    case "summary":
    case "actions":
      c.label = false;
    break;
    default:
      c.label = true;
  }

  return c;
});


let tabs = [
  {title:"Search our Jobs", filterBy:{type:"all", filter:null}, filters:[], search:true, options:{css:"osw-r up-c gamma tab-btn", active:true}},
  {title:"Head Office opportunities", filterBy:{type:"head_office_role", filter:null}, filters:["job_template"], search:false, options:{css:"osw-r up-c gamma tab-btn", active:false}},
  {title:"Venue opportunities", filterBy:{type:"venue", filter:null}, filters:["venue"], search:false, options:{css:"osw-r up-c gamma tab-btn", active:false}},
]


// console.log('foo', "bar");
    //   col[:show] = case col[:key]
    //     when "id" then false
    //     when "requester_name" then false
    //     when "expected_returned" then false
    //     else true
    //   end

    //   col
    // end

let css = {default: ""};

let buttons = [
  {key:"show", title:{text:"View :replace", replace:"title"}, text:"See details & apply", options:{ button_css: "button pop-l delta"}}
]

let date_ranges = [
  {key:"required_by", type:"date"}
]

let intro = "Sinus corae nonserum utatur as ne plam rerfernatle stiatus aecatem aut fugias aut la cori quatatur acestiorum. Li sendem hor is; nentes sua imor hos caectors furei tus aus auc teredum nihica int. Habempondite pri, nocci porente menatium ne con verem adees inum perfent iquidemneris egilique que."



ReactDOM.render(
  <Tab
    buttons     = {buttons}
    columns     = {columns}
    css         = {css}
    date_ranges = {date_ranges}
    dataApi     = "/api/vanilla/feed.json"
    expandable  = {true}
    filterApi   = "/api/vanilla/filters.json"
    intro       = {intro}
    icon        = "/assets/images/search.png"
    search      = "chef"
    tabs        = {tabs}
    noresults   = "We currently don’t have any available vacancies but please check back soon."
  />,
  document.getElementById('search')
);

