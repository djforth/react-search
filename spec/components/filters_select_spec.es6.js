var React = window.React  = require("react");

const FiltersSelect   = require("../../src/components/filters_select");

const Immutable = require("immutable");
const _         = require("lodash");

// Test Helpers
const TestUtils       = React.addons.TestUtils;
const componentHelper = require("react-jasmine").componentHelpers;
const jasmineReactHelpers = require("react-jasmine");

describe("FiltersSelect", function() {
  let filters_select, cssMixins, spy, action;
  let list = [{title:"Phil Collins", id:1}, {title:"Mike Rutherford", id:2}];
  let data = Immutable.fromJS([{title:"Phil Collins", id:1}, {title:"Mike Rutherford", id:2}]);
  let keys = ["foo", "bar"];
  let css  = {foo:"class1", default:"class2"}

  beforeEach(function() {
    // spy = jasmine.createSpyObj("FilterActions", ["selectFilter"]);
    action = FiltersSelect.__get__("FilterActions");
    spyOn(action, "selectFilter");

    // Stub filterfcty
    spy = jasmine.createSpyObj("filter", ["getAll", "getDetails"]);
    spy.getDetails.and.callFake((c)=>{
      return (c === "title") ? "Genesis" : "band_members";
    });
    spy.getAll.and.returnValue(data);

    filters_select = TestUtils.renderIntoDocument(<FiltersSelect filter={spy} /> );
  });

  afterEach(()=>{
    spy.getDetails.calls.reset();
    spy.getAll.calls.reset();
    // revert();
  });

  it("renders", () => {
    expect(filters_select).toBeTruthy();
  });

  describe("props/states defaults", ()=> {
    it("should set the filter", function() {
      expect(filters_select.props.filter).toEqual(spy);
    });

    it("should default selected to all by default", function() {
      expect(filters_select.state.selected).toEqual("all");
    });
  });

  describe("should call filter methods", function() {
    it("should call getDetails once", function() {
      expect(spy.getDetails).toHaveBeenCalledWith("title");
      expect(spy.getDetails.calls.count()).toEqual(1);

    });

    it("should call getAll once", function() {
      expect(spy.getAll).toHaveBeenCalled();
      expect(spy.getAll.calls.count()).toEqual(1);
    });
  });

  describe("check render method", ()=> {
    let form_group
    beforeEach(()=> {
      spyOn(filters_select, "renderOptions").and.returnValue("");
      filters_select.forceUpdate();
      form_group = TestUtils.findRenderedDOMComponentWithClass(filters_select, "form-group");

    });

    it("should call renderFiltersOpts", function() {
      expect(filters_select.renderOptions).toHaveBeenCalled();
    });

    componentHelper.checkRender(
      ()=>{
        return form_group;
      },
      {type:"tag", tag:"label"},
      {
        textNode:"Genesis"
      }
    );

    componentHelper.checkRender(
      ()=>{
        return form_group;
      },
      {type:"tag", tag:"option"},
      {
        attributes:[{key:"value", value:"all"}],
        textNode:"All"
      }
    );
  });

  describe("Check Options are rendered", ()=>{
    let options;
    beforeEach(()=> {
      // spyOn(filters_select, "checkSelected").and.returnValue(false);
      spyOn(filters_select, "_onChange")
      filters_select.forceUpdate();

      options = TestUtils.scryRenderedDOMComponentsWithTag(filters_select, "option");


    });

    it("should add 3 Options", function() {
      expect(options.length).toEqual(3);

      _.forEach(options, (opt, i)=>{

        let elm = opt.getDOMNode();
        if(i > 0){
          let n = i - 1;
          expect(elm.getAttribute("value")).toEqual(String(list[n].id));
          expect(elm.textContent).toEqual(list[n].title);
        } else {
          expect(elm.getAttribute("value")).toEqual("all");
          expect(elm.textContent).toEqual("All");
        }


      });
    });

    it("should set Selected option if set", ()=>{
      filters_select.setState({selected:2});

      options = TestUtils.scryRenderedDOMComponentsWithTag(filters_select, "option");

      let selected = _.last(options);
      let elm = selected.getDOMNode();
      expect(elm.getAttribute("selected")).toEqual("");
    });

    it("should call on _onChange when changed", function() {
      let select = TestUtils.findRenderedDOMComponentWithTag(filters_select, "select");
      TestUtils.Simulate.change(select);
      // console.log("testing 123 <<<<<<< ", label);
      expect(filters_select._onChange).toHaveBeenCalled();
      filters_select._onChange.calls.reset();

    });
  });

  describe("check on _onChange", function() {
    beforeEach(()=>{
      filters_select._onChange({target:{value:"1"}});

    })
    it("should call filterFcy getDetails ", function() {
      expect(spy.getDetails).toHaveBeenCalledWith("filterBy")
    });

    it("should call filterFcy getDetails ", function() {
      expect(filters_select.state.selected).toEqual(1);
    });

    it("should call filterFcy getDetails ", function() {
      expect(action.selectFilter).toHaveBeenCalledWith("band_members", "1");
    });
  });
});