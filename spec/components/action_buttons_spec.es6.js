const React     = require("react");
const Immutable = require("immutable");

const ActionButtons   = require("../../src/components/action_buttons");

// const Immutable = require("immutable");

// Test Helpers
const TestUtils       = React.addons.TestUtils;
const jasmineReactHelpers = require("react-jasmine");
const componentHelper     = jasmineReactHelpers.componentHelpers;

let spys = [
  {
    fn:function(){
      return  (<div className="icon_btn">Icon Button</div>);
    },
    title:"IconBtn"
  },
  {
    fn:function(){
      return  (<div className="delete_btn">Delete Button</div>);
    },
    title:"DeleteBtn"
  }
];

describe("Action Buttons", function() {
  let action_btns, spy, revert;
  let spied = jasmineReactHelpers.spyOnComponents(spys, ActionButtons);
  let data   = {
    title:"Phil Collins", buttons:{show:"/foo/1"}
  }

  let dataIm = Immutable.fromJS(data);

  let config = [
    {key:"show", title:{text:"The awesome :replace", replace:"title"}, icon:"tv", text:"", options:{ button_type: "default", placement: "top"}}
  ]

  beforeEach(()=>{
    // DataStore = Pagination.__get__("DataStore");
    // storeListeners.stubStore(DataStore, stubs);
    // spyOn(DataStore, "getPagination").and.callFake(()=>{return items});

    // DataAction = Pagination.__get__("DataActions");
    // spyOn(DataAction, "pageChange");

    action_btns = TestUtils.renderIntoDocument(<ActionButtons data={dataIm} config={config} />);
  });

  it("should exist", function() {
    expect(action_btns).toBeDefined();
  });

  describe('get/set Methods', function() {
    it("should get Path", function() {
      let path = action_btns.getPath("show");
      expect(path).toEqual("/foo/1");
    });


    it("should create title", function() {
      let title = action_btns.setTitle(config[0].title);

      expect(title).toEqual("The awesome Phil Collins")
    });

  });

});