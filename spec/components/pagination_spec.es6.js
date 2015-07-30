var React = window.React  = require("react/addons");

const Pagination = require("../../src/components/pagination");

const Immutable = require("immutable");
const _         = require("lodash");

// Test Helpers
const TestUtils           = React.addons.TestUtils;

const jasmineReactHelpers = require("react-jasmine");
const componentHelper     = jasmineReactHelpers.componentHelpers;
const storeListeners      = jasmineReactHelpers.checkListeners

let spys = [
  {
    fn:function(){
      return  (<div className="pagination">Pagination</div>);
    },
    title:"Pagination"
  }
];

describe("Pagination", function() {
  let pagination, DataStore, DataAction, spy, revert;
  let spied = jasmineReactHelpers.spyOnComponents(spys, Pagination);
  let items = 2;
  let stubs = [
    {title:"addChangeListener"},
    {title:"removeChangeListener"}
  ];

  beforeEach(()=>{
    DataStore = Pagination.__get__("DataStore");
    storeListeners.stubStore(DataStore, stubs);
    spyOn(DataStore, "getPagination").and.callFake(()=>{return items});

    DataAction = Pagination.__get__("DataActions");
    spyOn(DataAction, "pageChange");

    pagination = TestUtils.renderIntoDocument(<Pagination />);
  });

  it("should exist", function() {
    expect(pagination).toBeDefined();
  });

  describe("state defaults", function() {
    var stateDefaults = {
        activePage:1,
        items:0,
        maxButtons:0,
        prevNext:false
      };

    componentHelper.checkState(()=>{
      return pagination;
    }, stateDefaults);
  });

  describe("check componentDidMount spies called", function() {
    it("should call addChangeListener on mounting", function() {
      let events =["search", "fetched"];
      storeListeners.checkListeners(DataStore, "addChangeListener", events );
    });
  });

  describe("check componentWillUnmmont spies", function() {
    it("should call addRemoveListener on unmounting", function() {
      pagination.componentWillUnmount();
      let events =["search", "fetched"];
      storeListeners.checkListeners(DataStore, "removeChangeListener", events );
    });
  });

  describe("check event functions", function() {
    let events = [
      {fn:"_onUpdate" , spy:"getPagination", state:{items:2, prevNext:true, maxButtons:2}}
    ];

    storeListeners.checkAllEvents(()=>{
      return {comp:pagination, store:DataStore}
    }, events);

    it("should set correct states if 0", function() {
      items = 0;
      pagination._onUpdate();
      let state = pagination.state;
      expect(state.items).toEqual(0);
      expect(state.maxButtons).toEqual(0);
      expect(state.prevNext).toBeFalsy();
    });

    it("should set correct states if > 10", function() {
      items = 20;
      pagination._onUpdate();
      let state = pagination.state;
      expect(state.items).toEqual(20);
      expect(state.maxButtons).toEqual(10);
      expect(state.prevNext).toBeTruthy();
    });
  });

  describe('when hidePagination', function() {
    it("should return hidden if > 1", function() {
      pagination.state.items = 10;
      expect(pagination.hidePagination()).toEqual("");
    });

    it("should return hidden if equal to 1", function() {
      pagination.state.items = 1;
      expect(pagination.hidePagination()).toEqual("hidden");
    });
  });

  describe('_handleSelect', function() {
    beforeEach(()=>{
      pagination._handleSelect("", {eventKey:2});
    });

    it("should set activePage state ", function() {
      expect(pagination.state.activePage).toEqual(2);
    });

    it("should call DataAction", function() {
      expect(DataAction.pageChange).toHaveBeenCalledWith(2);
    });
  });

  describe("check mocked components", ()=> {
    beforeEach(()=>{
      //force render with data
      items = 20;
      pagination._onUpdate();
      // pagination.forceUpdate();
    });

    jasmineReactHelpers.checkSpyWithProps(
    [
      {
        title:"Pagination",
        props:{
          bsSize     : "medium",
          items      : 0,
          prev       : false,
          next       : false,
          ellipsis   : true,
          maxButtons : 0,
          activePage : 1
        }
      }
    ], spied);
  });

});