var React = require("react/addons");

const Filter   = require("../../src/components/filters");

const Immutable = require("immutable");

// Test Helpers
const TestUtils       = React.addons.TestUtils;
const jasmineReactHelpers = require("react-jasmine");
const componentHelper     = jasmineReactHelpers.componentHelpers;
const storeListeners      = jasmineReactHelpers.checkListeners

let spys = [
  {
    fn:function(){
      return  (<div className="checkbox">Checkbox</div>);
    },
    title:"FiltersCheck"
  },
  {
    fn:function(){
      return  (<div className="date">Date</div>);
    },
    title:"FiltersDate"
  },
  {
    fn:function(){
      return  (<div className="select">Select</div>);
    },
    title:"FiltersSelect"
  },
  {
    fn:function(){
      return  (<div className="radio">Radio</div>);
    },
    title:"FiltersRadio"
  },
  {
    fn:function(){
      return  (<div className="search">SearchFilter</div>);
    },
    title:"SearchFilter"
  }
];

let columns = [
  {key:"id"},
  {key:"title", desktop:true, mobile:true, tablet:true, searchable:true},
];

describe("Filter", function() {
  let filter, cssMixins, spy, revert, FilterStore, FilterActions, DataActions;
  let data = [
    {"title":"company","filter_by":"company","input_type":"radio","filter_options":[{"id":2,"title":"Morse Digital"}]},
    {"title":"company","filter_by":"company","input_type":"checkbox","filter_options":[{"id":2,"title":"Morse Digital"}]},
    {"title":"company","filter_by":"company","input_type":null,"filter_options":[{"id":2,"title":"Morse Digital"}]}
  ];
  let dataIm = Immutable.fromJS(data)
  let stubs = [
    {title:"addChangeListener"},
    {title:"removeChangeListener"},
    {title:"fetchData"},
    {title:"setApi"},
    {title:"getAll", returnValue:dataIm}
  ]

  let spied = jasmineReactHelpers.spyOnComponents(spys, Filter);

  beforeEach(() => {
    //Spy on Store
    FilterStore = Filter.__get__("FilterStore");
    storeListeners.stubStore(FilterStore, stubs);

    //Spy on Actions
    FilterActions = Filter.__get__("FilterActions");
    spyOn(FilterActions, "fetchFilters");

    DataActions = Filter.__get__("DataActions");
    spyOn(DataActions, "filterChange");



    filter = TestUtils.renderIntoDocument(<Filter
      // dataApi   = "/api/generic/feed.json"
      filterApi = "/api/generic/filter.json"
      /> );

    spyOn(filter, "checkCss").and.callThrough();
    spyOn(filter, "getClasses").and.callThrough();
    spyOn(filter, "toggleCss").and.callThrough();

    filter.forceUpdate();
  });

  afterEach(function() {
    filter.checkCss.calls.reset();
  });

  it("renders", () => {
    expect(filter).toBeTruthy();
  });

  describe("props and state defaults", function() {
    var propsDefaults = {
        filterApi:"/api/generic/filter.json"
      };

    var stateDefaults = {

        chevron : "glyphicon glyphicon-chevron-up",
        filters : null,
        panel   : "panel-body collapse"
      };

    componentHelper.checkPropsAndState(()=>{
      return filter;
    }, propsDefaults, stateDefaults);
  });

  describe("check componentDidMount spies called", function() {
    it("should call action fetchFilters", function() {
      expect(FilterActions.fetchFilters).toHaveBeenCalledWith("/api/generic/filter.json");
    });

    it("should call addChangeListener on mounting", function() {
      let events =["change", "fetched"];
      storeListeners.checkListeners(FilterStore, "addChangeListener", events );
    });
  });

  describe("check componentWillUnmmont spies", function() {
    it("should call addRemoveListener on unmounting", function() {
      filter.componentWillUnmount();
      let events =["change", "fetched"];
      storeListeners.checkListeners(FilterStore, "removeChangeListener", events );
    });
  });

  describe('events', function() {
    beforeEach(()=>{
      spyOn(filter, "setState").and.callFake((state)=>{
        filter.state = state;
      });
    });
    describe('_onUpdate', function() {
      it("should set State", function() {
        filter._onUpdate()
        expect(filter.setState).toHaveBeenCalledWith({filters:dataIm})
        expect(FilterStore.getAll).toHaveBeenCalled();
      });
    });

    describe('_onFilter', function() {
      beforeEach(()=>{
        spy = jasmine.createSpyObj("e", ["preventDefault"]);
        filter._onFilter(spy);
      });

      it("should call preventDefault", function() {
        expect(spy.preventDefault).toHaveBeenCalled();
      });

      it("should call set state", function() {
        expect(DataActions.filterChange).toHaveBeenCalled();
      });
    });

    describe('_onClick', function() {
      beforeEach(()=>{
        spy = jasmine.createSpyObj("e", ["preventDefault"]);
        filter._onClick(spy);
      });

      it("should call preventDefault", function() {
        expect(spy.preventDefault).toHaveBeenCalled();
      });

      it("should set chevron", function() {
        let chevron = filter.chevron;
        expect(chevron[1]["glyphicon-chevron-up"]).toBeFalsy();
        expect(chevron[2]["glyphicon-chevron-down"]).toBeTruthy();
      });

      it("should set panel", function() {
        expect(filter.panel[2]["in"]).toBeTruthy()
      });

      it("should call set state", function() {
        expect(filter.setState).toHaveBeenCalledWith({chevron:"glyphicon glyphicon-chevron-down", panel:"panel-body collapse in"});

      });
    });
  });
});