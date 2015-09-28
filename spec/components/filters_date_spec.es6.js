var React = require("react/addons");

const FiltersDate = require("../../src/components/filters_date");

const Immutable = require("immutable");
const _         = require("lodash");

// Test Helpers
const TestUtils       = React.addons.TestUtils;
const componentHelper = require("react-jasmine").componentHelpers;
const jasmineReactHelpers = require("react-jasmine");

let spys = [
  {
    fn:function(){
      return  (<div className="Calendar"> Calendar </div>);
    },
    title:"DatePiker"
  }
];

describe("FiltersDate", function() {
  let filterdate, spy, revert, FilterActions, st, fn;
  let spied = jasmineReactHelpers.spyOnComponents(spys, FiltersDate);
  let date_range = {key:"required_by", type:"date"}

  let date = new Date();
  let year = date.getFullYear();
  date.setFullYear(year - 100);
  st = _.clone(date);
  date.setFullYear(year + 100);
  fn = _.clone(date);
  console.log(st, fn);

  beforeEach(()=>{
    FilterActions = FiltersDate.__get__("FilterActions");
    spyOn(FilterActions, "changeDate");



    filterdate = TestUtils.renderIntoDocument(<FiltersDate date_range={date_range} /> );
  });

  it("renders", () => {
    expect(filterdate).toBeTruthy();
  });

  describe("props and state defaults", function() {
    var propsDefaults = {
        date_range : date_range
      };

    var stateDefaults = {
        start : st,
        end   : fn
      };

    componentHelper.checkProps(()=>{
      return filterdate;
    }, propsDefaults);

    it("should sets start and end", function() {
      expect(_.isDate(filterdate.start)).toBeTruthy();
      expect(_.isDate(filterdate.end)).toBeTruthy();

      expect(_.isDate(filterdate.state.start)).toBeTruthy();
      expect(_.isDate(filterdate.state.end)).toBeTruthy();
    });
  });


});