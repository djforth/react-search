var React = window.React = require("react/addons");

const DataItems = require("../../src/components/data_items");

const Immutable = require("immutable");
const _         = require("lodash");

// Test Helpers
const TestUtils       = React.addons.TestUtils;
const componentHelper = require("react-jasmine").componentHelpers;
const jasmineReactHelpers = require("react-jasmine");

const storeListeners = require("react-jasmine").checkListeners

//Stub components
let spys = [
  {
    fn:function(){
      return  (<div>{this.props.data.get("title")}</div>);
    },
    title:"DataItem"
  }
];

describe("DataItems", function() {
  // Setup
  let dataitems, DataStore, revert, Viewport;
  let spy, store;
  let spied   = jasmineReactHelpers.spyOnComponents(spys, DataItems);
  let columns = ["foo", "bar", "phil"];
  let data    = [{title:"foo", id:1}, {title:"Bar", id:2}, {title:"foo-bar", id:3}];
  let dataIm  = Immutable.fromJS(data);
  let props = {
    desktop:columns,
    tablet:_.slice(columns, 0, 1),
    mobile:_.first(columns),
    css:"phil"
  };

  let stubs = [
    {title:"addChangeListener"},
    {title:"removeChangeListener"},
    {title:"getAll", returnValue:dataIm},
    {title:"getKeys", returnValue:columns},
    {title:"paginationData", returnValue:dataIm.slice(0, 1)},
    {title:"getSearchData", returnValue:dataIm.slice(0, 1)}
  ];

  beforeEach(()=> {
    // Stub out viewport detection
    spy = jasmine.createSpyObj("ViewportDetection", ["getDevice", "windowSize", "trackSize"]);
    spy.getDevice.and.returnValue("desktop");
    Viewport = DataItems.__get__("ViewportDetect");
    store = {
        getDevice:Viewport.prototype.getDevice,
        trackSize:Viewport.prototype.trackSize
      };

    Object.assign(Viewport.prototype, spy);

    //Spy on Store
    DataStore = DataItems.__get__("DataStore");
    storeListeners.stubStore(DataStore, stubs);

    dataitems = TestUtils.renderIntoDocument(<DataItems
      desktop = {props.desktop}
      tablet  = {props.tablet}
      mobile  = {props.mobile}
      css     = {props.css}
      /> );
  });

  afterEach(function(){
    Object.assign(Viewport.prototype, store);
  });

  it("renders", () => {
    expect(dataitems).toBeTruthy();
  });

  describe("props and state defaults", function() {


    var stateDefaults = {
        device  : "desktop",
        visible : props.desktop
      };

    componentHelper.checkPropsAndState(()=>{
      return dataitems;
    }, props, stateDefaults);
  });

  describe("check componentDidMount spies called", function() {
    it("should call viewportDection spies", function() {
      expect(spy.getDevice).toHaveBeenCalled();
      expect(spy.trackSize).toHaveBeenCalled();

      let calls = _.first(spy.trackSize.calls.argsFor(0));
      expect(_.isFunction(calls)).toBeTruthy();
    });

    it("should call addChangeListener on mounting", function() {
      let events =["search", "pagination", "change", "fetched", "delete"];
      storeListeners.checkListeners(DataStore, "addChangeListener", events );
    });
  });

  describe("check componentWillUnmmont spies", function() {
    it("should call addRemoveListener on unmounting", function() {
      dataitems.componentWillUnmount();
      let events =["search", "pagination", "change", "fetched", "delete"];
      storeListeners.checkListeners(DataStore, "removeChangeListener", events );
    });
  });

  describe("check event functions", function() {
    let events = [
      {fn:"_onChange" , spy:"paginationData", state:{data:dataIm.slice(0, 1)}},
      {fn:"_onPagination" , spy:"paginationData", state:{data:dataIm.slice(0, 1)}},
      {fn:"_onSearch" , spy:"getSearchData", state:{data:dataIm.slice(0, 1)}},
      {fn:"_onLoaded" , spy:["getAll","getKeys"], state:{data:dataIm, keys:columns}},
    ];

    storeListeners.checkAllEvents(()=>{
      return {comp:dataitems, store:DataStore}
    }, events)
  });


  describe("check mocked components", ()=> {
    beforeEach(()=>{
      //force render with data
      dataitems._onLoaded();
    });

    jasmineReactHelpers.checkSpyWithProps(
    [
      {
        title:"DataItem",
        props:{
          data: dataIm.first(),
          keys:props.desktop,
          css:props.css
        }
      }
    ], spied);
  });
});