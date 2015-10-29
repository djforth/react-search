
// require("babelify/polyfill");

var dropDown;
var React        = window.React  = require("react");

const CheckBox   = require("../../src/components/check_box");

// Test Helpers
const TestUtils       = React.addons.TestUtils;
const componentHelper = require("react-jasmine").componentHelpers;

describe("Checkbox", function() {
  let checkbox, revert;
  let spy = jasmine.createSpyObj("FilterActions", ["checkFilter"]);
  let mockdata ={id:1, title:"foo", selected:true}
  beforeEach(() => {
    revert = CheckBox.__set__("FilterActions", spy);
    checkbox = TestUtils.renderIntoDocument(<CheckBox data={mockdata} filterBy={"color"} /> );
  });

  afterEach(()=>{
    spy.checkFilter.calls.reset();
    revert();
  });

  it("renders", () => {
    expect(checkbox).toBeTruthy();
  });

  describe("props and state defaults", function() {
    var propsDefaults = {
        data : {
          id       : 1,
          title    : "foo",
          selected : true
        },
        filterBy : "color"
      };

    var stateDefaults = {
        id       : "color-foo-1",
        value    : 1,
        title    : "foo",
        selected : true
      };

    componentHelper.checkPropsAndState(()=>{
      return checkbox;
    }, propsDefaults, stateDefaults);
  });

  describe("_onChecked", function() {

    it("should change selected state to true", function() {
      checkbox.state.selected = false;
      checkbox._onChecked();

      expect(checkbox.state.selected).toBeTruthy();
      expect(spy.checkFilter).toHaveBeenCalledWith("color", "1", true)
    });

    it("should change selected state to false", function() {
      checkbox.state.selected = true;
      checkbox._onChecked();

      expect(checkbox.state.selected).toBeFalsy();
      expect(spy.checkFilter).toHaveBeenCalledWith("color", "1", false);
    });
  });

  describe("check html render", function() {
    let label, input;
    beforeEach(()=>{
      label = TestUtils.findRenderedDOMComponentWithTag(checkbox, "label")
      // input = TestUtils.findRenderedDOMComponentWithTag(label, "input")
    })


    componentHelper.checkRender(
      ()=>{
        return checkbox;
      },
      {type:"tag", tag:"label"},
      {
        attributes:[
          {key:"for", value:"color-foo-1"}
        ],
        textNode:"foo"
      }
    );

    componentHelper.checkRender(
      ()=>{
        return TestUtils.findRenderedDOMComponentWithTag(checkbox, "label");
      },
      {type:"tag", tag:"input"},
      {
        attributes:[
          {key:"id"     , value:"color-foo-1"},
          {key:"type"   , value:"checkbox"},
          {key:"value"  , value:"1"}
        ]
      }
    );

    componentHelper.checkEvent(
      ()=>{
        return checkbox;
      },
      {type:"tag", identifier:"input"},
      "_onChecked",
      "change"
    );
  });


});