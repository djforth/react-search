var React = window.React  = require("react");

const FiltersRadio   = require("../../src/components/filters_radio");

const Immutable = require("immutable");
const _         = require("lodash");

// Test Helpers
const TestUtils       = React.addons.TestUtils;
const componentHelper = require("react-jasmine").componentHelpers;
const jasmineReactHelpers = require("react-jasmine");

describe("FiltersRadio", function() {
  let filtersradio, cssMixins, spy, action;
  let list = [{title:"Phil Collins", id:1}, {title:"Mike Rutherford", id:2}];
  let data = Immutable.fromJS([{title:"Phil Collins", id:1}, {title:"Mike Rutherford", id:2}]);
  let keys = ["foo", "bar"];
  let css  = {foo:"class1", default:"class2"}

  beforeEach(function() {
    // spy = jasmine.createSpyObj("FilterActions", ["selectFilter"]);
    action = FiltersRadio.__get__("FilterActions");
    spyOn(action, "selectFilter");
    // Stub filterfcty
    spy = jasmine.createSpyObj("filter", ["getAll", "getDetails"]);
    spy.getDetails.and.callFake((c)=>{
      return (c === "title") ? "Genesis" : "band_members";
    });
    spy.getAll.and.returnValue(data);

    filtersradio = TestUtils.renderIntoDocument(<FiltersRadio filter={spy} /> );


  });

  afterEach(()=>{
    spy.getDetails.calls.reset();
    spy.getAll.calls.reset();
    // revert();
  });

  it("renders", () => {
    expect(filtersradio).toBeTruthy();
  });

  describe("props defaults", ()=> {
    it("should set the filter", function() {
      expect(filtersradio.props.filter).toEqual(spy)
    });
  });

  describe("should call filter methods", function() {
    it("should call getDetails twice", function() {
      expect(spy.getDetails.calls.count()).toEqual(2);
      _.forEach(spy.getDetails.calls.allArgs(), (args, i)=>{
        let result = (i ===  0) ? "title" : "filterBy";
        expect(_.first(args)).toEqual(result);
      })
    });

    it("should call getAll once", function() {
      expect(spy.getAll).toHaveBeenCalled();
      expect(spy.getAll.calls.count()).toEqual(1);
    });
  });

  describe("check render method", ()=> {
    let form_group
    beforeEach(()=> {
      spyOn(filtersradio, "renderFiltersOpts").and.returnValue("");
      filtersradio.forceUpdate()
      form_group = TestUtils.findRenderedDOMComponentWithClass(filtersradio, "form-group");

    });

    it("should call renderFiltersOpts", function() {
      expect(filtersradio.renderFiltersOpts).toHaveBeenCalled();
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
  });

  describe("Check Radios are rendered", ()=>{
    let radioGroup, labels
    beforeEach(()=> {
      spyOn(filtersradio, "checkSelected").and.returnValue(false);
      spyOn(filtersradio, "_onChange")
      filtersradio.forceUpdate();

      let form_group = TestUtils.findRenderedDOMComponentWithClass(filtersradio, "form-group");

      radioGroup = TestUtils.findRenderedDOMComponentWithClass(form_group, "radio-group");
      labels = TestUtils.scryRenderedDOMComponentsWithClass(radioGroup, "radio-inline");


    });

    it("should add 2 radio buttons", function() {
      expect(labels.length).toEqual(2);

      _.forEach(labels, (label, i)=>{
        let input = TestUtils.findRenderedDOMComponentWithTag(label, "input");
        let span = TestUtils.findRenderedDOMComponentWithTag(label, "span");
        let elm = input.getDOMNode();
        let attrs = {value:String(list[i].id), type:"radio", name:"band_members"}

        _.forIn(attrs, (v, k)=>{
          expect(elm.getAttribute(k)).toEqual(v);
        })

        expect(span.getDOMNode().textContent).toEqual(list[i].title);

      });
    });

    it("should call checkSelected", function() {
      expect(filtersradio.checkSelected).toHaveBeenCalled();
      expect(filtersradio.checkSelected.calls.count()).toEqual(2);
    });

    it("should call on _onChange when changed", function() {

      _.forEach(labels, (label)=>{
        let input = TestUtils.findRenderedDOMComponentWithTag(label, "input");
        TestUtils.Simulate.change(input);
        // console.log("testing 123 <<<<<<< ", label);
        expect(filtersradio._onChange).toHaveBeenCalled();
        filtersradio._onChange.calls.reset();
      })
    });
  });

  describe("check on _onChange", function() {
    beforeEach(()=>{
      filtersradio._onChange({target:{value:"1"}});

    })
    it("should call filterFcy getDetails ", function() {
      expect(spy.getDetails).toHaveBeenCalledWith("filterBy")
    });

    it("should call filterFcy getDetails ", function() {
      expect(filtersradio.state.selected).toEqual(1);
    });

    it("should call filterFcy getDetails ", function() {
      expect(action.selectFilter).toHaveBeenCalledWith("band_members", "1");
    });
  });

  describe("checkSelected", function() {
    beforeEach(()=>{
      filtersradio.state.selected = 1;
    });

    it("should return true if the same", function() {
      expect(filtersradio.checkSelected(1)).toBeTruthy();
    });

    it("should return false if not the same", function() {
      expect(filtersradio.checkSelected(2)).toBeFalsy();
    });
  });


});