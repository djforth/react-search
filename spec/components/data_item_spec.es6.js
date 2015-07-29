var React        = window.React  = require("react/addons");

const DataItem   = require("../../src/components/data_item");

const Immutable = require("immutable");

// Test Helpers
const TestUtils       = React.addons.TestUtils;
const componentHelper = require("react-jasmine").componentHelpers;

describe("DataItem", function() {
  let dataitem, cssMixins, spy, revert;
  let data = Immutable.fromJS({foo:"Phil", bar:"Collins"})
  let keys = ["foo", "bar"];
  let css  = {foo:"class1", default:"class2"}
  beforeEach(() => {
    spy = jasmine.createSpyObj("DataStore", ["get"])
    spy.get.and.returnValue(data);
    revert = DataItem.__set__("DataStore", spy);
    dataitem = TestUtils.renderIntoDocument(<DataItem id="1" css={css} keys={keys} /> );

    spyOn(dataitem, "checkCss").and.callThrough();


    dataitem.forceUpdate();
  });

  afterEach(function() {
    dataitem.checkCss.calls.reset();
    revert();
  });

  it("renders", () => {
    expect(dataitem).toBeTruthy();
  });

  it("should call dataStore", function() {
    expect(spy.get).toHaveBeenCalledWith("1");
  });

  describe("props and state defaults", function() {
    var propsDefaults = {
        css  : css,
        keys : keys,
        id   : "1"
      };

    var stateDefaults = {
        data : data
      };

    componentHelper.checkPropsAndState(()=>{
      return dataitem;
    }, propsDefaults, stateDefaults);
  });

  describe("Name of the group", function() {
    let td;
    beforeEach(()=>{

      td = TestUtils.findRenderedDOMComponentWithClass(dataitem, "tr");
    });



    componentHelper.checkRender(
      ()=>{
        return td;
      },
      {type:"className", className:"class1"},
      {
        attributes:[
          {key:"class", value:"class1"}
        ],
        textNode:"Phil"
      }
    );

    componentHelper.checkRender(
      ()=>{
        return td;
      },
      {type:"className", className:"class2"},
      {
        attributes:[
          {key:"class", value:"class2"}
        ],
        textNode:"Collins"
      }
    );

    it("should have called checkCss & capitalize", function() {
      expect(dataitem.checkCss.calls.count()).toEqual(2);
      // expect(datahead.capitalize.calls.count()).toEqual(2);
    });
  });

});