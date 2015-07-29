var React = window.React  = require("react/addons");

const FilterCheck   = require("../../src/components/filters_check");

const Immutable = require("immutable");
const _         = require("lodash");

// Test Helpers
const TestUtils       = React.addons.TestUtils;
const componentHelper = require("react-jasmine").componentHelpers;
const jasmineReactHelpers = require("react-jasmine");

let spys = [
  {
    fn:function(){
      return  (<input className="checkbox" value={this.props.data.title} id={this.props.filterBy} />);
    },
    title:"CheckBox"
  }
];

describe("FilterCheck", function() {
  let filtercheck, cssMixins, spy, revert;
  let data = Immutable.fromJS([{name:"Phil Collins", id:1}, {name:"Mike Rutherford", id:2}]);
  let keys = ["foo", "bar"];
  let css  = {foo:"class1", default:"class2"}

  let spied = jasmineReactHelpers.spyOnComponents(spys, FilterCheck);

  beforeEach(function() {
    // Stub filterfcty
    spy = jasmine.createSpyObj("filter", ["getAll", "getDetails"]);
    spy.getDetails.and.callFake((c)=>{
      return (c === "title") ? "Genesis" : "band_members";
    });
    spy.getAll.and.returnValue(data);

    filtercheck = TestUtils.renderIntoDocument(<FilterCheck filter={spy} /> );


  });

  afterEach(()=>{
    spy.getDetails.calls.reset();
    spy.getAll.calls.reset();
  })

  it("renders", () => {
    expect(filtercheck).toBeTruthy();
  });

  describe("props defaults", ()=> {
    it("should set the filter", function() {
      expect(filtercheck.props.filter).toEqual(spy)
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

  describe("check mocked components", ()=> {
    jasmineReactHelpers.checkSpyWithProps(
    [
      {
        title:"CheckBox",
        props:{
          data: {name:"Phil Collins", id:1},
          filterBy:"band_members"
        }
      }
    ], spied);
  });

  describe("check render ", ()=> {
    let form_group
    beforeEach(()=> {
      form_group = TestUtils.findRenderedDOMComponentWithClass(filtercheck, "form-group");

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


});