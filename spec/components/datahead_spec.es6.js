var React        = window.React  = require("react/addons");

const DataHead   = require("../../src/components/data_head");

// Test Helpers
const TestUtils       = React.addons.TestUtils;
const componentHelper = require("react-jasmine").componentHelpers;

describe("DataHead", function() {
  let datahead, cssMixins, textMixins;
  let keys = ["foo", "bar"];
  let css  = {foo:"class1", default:"class2"}
  beforeEach(() => {
    datahead = TestUtils.renderIntoDocument(<DataHead keys={keys} css={css} /> );

    spyOn(datahead, "checkCss").and.callThrough();
    spyOn(datahead, "capitalize").and.callFake((c)=>{
      return c;
    });

    datahead.forceUpdate();
  });

  afterEach(function() {
    datahead.checkCss.calls.reset();
    datahead.capitalize.calls.reset();
  });

  it("renders", () => {


    expect(datahead).toBeTruthy();
  });

  describe("props defaults", function() {
    var propsDefaults = {
        keys : keys,
        css  : css
      };

    componentHelper.checkProps(()=>{
      return datahead;
    }, propsDefaults);
  });


  describe("Name of the group", function() {
    let tr;
    beforeEach(()=>{
      let th = TestUtils.findRenderedDOMComponentWithClass(datahead, "thead");
      tr = TestUtils.findRenderedDOMComponentWithClass(th, "tr");
    });

    // componentHelper.checkRender(
    //   ()=>{
    //     return tr;
    //   },
    //   {type:"className", className:"class1"},
    //   {
    //     attributes:[
    //       {key:"class", value:"class1"}
    //     ],
    //     textNode:"foo"
    //   }
    // );

    // componentHelper.checkRender(
    //   ()=>{
    //     return tr;
    //   },
    //   {type:"className", className:"class2"},
    //   {
    //     attributes:[
    //       {key:"class", value:"class2"}
    //     ],
    //     textNode:"bar"
    //   }
    // );

    it("should have called checkCss & capitalize", function() {
      expect(datahead.checkCss.calls.count()).toEqual(2);
      expect(datahead.capitalize.calls.count()).toEqual(2);
    });
  });
});