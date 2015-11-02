var React = window.React  = require("react/addons");

const Keys   = require("../../src/components/keys");

const Immutable = require("immutable");
const _         = require("lodash");

// Test Helpers
const TestUtils       = React.addons.TestUtils;
const componentHelper = require("react-jasmine").componentHelpers;
const jasmineReactHelpers = require("react-jasmine");
const storeListeners = require("react-jasmine").checkListeners

describe("Keys", function() {
  let keys, spy, FilterAction, DataAction, FilterStore;
  let props    = {item:"phil_collins"};
  let selected = false;
  let stubs = [
    {title:"addChangeListener"},
    {title:"removeChangeListener"},
    {title:"isSelectedKey", callFake:()=>{return selected}},
  ];


  beforeEach(function() {
    // Spy filter Actions
    FilterAction = Keys.__get__("FilterActions");
    spyOn(FilterAction, "changeKey");

    // Spy data Actions
    DataAction = Keys.__get__("DataActions");
    spyOn(DataAction, "keyUpdate");

    //Spy on FilterStore
    FilterStore = Keys.__get__("FilterStore");
    storeListeners.stubStore(FilterStore, stubs);
    // Stub filterfcty

    keys = TestUtils.renderIntoDocument(<Keys item={props.item} /> );
  });

  it("renders", () => {
    expect(keys).toBeTruthy();
  });

  describe("props and state defaults", function() {
    var stateDefaults = {
        active:""
      };

    componentHelper.checkPropsAndState(()=>{
      return keys;
    }, props, stateDefaults);
  });

  describe("check componentDidMount spies called", function() {

    it("should call addChangeListener on mounting", function() {
      let events =["change_key"];
      storeListeners.checkListeners(FilterStore, "addChangeListener", events );
    });
  });

  describe("check componentWillUnmmont spies", function() {
    it("should call addRemoveListener on unmounting", function() {
      keys.componentWillUnmount();
      let events =["change_key"];
      storeListeners.checkListeners(FilterStore, "removeChangeListener", events );
    });
  });

  describe("check onChange if selectedKey is false", function() {
    let events = [{
       fn:"_onChange" ,
       spy:{fn:"isSelectedKey", call:"phil_collins"},
       state:{active:""}
     }];

    storeListeners.checkAllEvents(()=>{
      return {comp:keys, store:FilterStore}
    }, events);
  });

  describe("check onChange if selectedKey is true", function() {
    beforeEach(function() {
      selected = true
    });
    let events = [{
       fn:"_onChange" ,
       spy:{fn:"isSelectedKey", call:"phil_collins"},
       state:{active:"active"}
     }];

    storeListeners.checkAllEvents(()=>{
      return {comp:keys, store:FilterStore}
    }, event);
  });

  describe("check render ", ()=> {
    beforeEach(function() {
      selected = true;
      keys.forceUpdate();
    });
    // componentHelper.checkRender(
    //   ()=>{
    //     return keys;
    //   },
    //   {type:"tag", tag:"a"},
    //   {
    //     textNode:"Phil collins"
    //   }
    // );

    // componentHelper.checkRender(
    //   ()=>{
    //     return keys;
    //   },
    //   {type:"tag", tag:"li"},
    //   {
    //     attributes:[{key:"class", value:"active"}]
    //   }
    // );
  });

  describe("check click event", function() {
    componentHelper.checkEvent(
      ()=>{
        return keys;
      },
      {type:"tag", identifier:"a"},
      "_select",
      "click"
    );

    describe("check _select function", function() {

      beforeEach(()=>{
        spy = jasmine.createSpyObj("e", ["preventDefault"]);
        keys.active = [{active:false}]
        keys._select(spy);
      });

      it("should call preventDefault", function() {
        expect(spy.preventDefault).toHaveBeenCalled();
      });

      it("should set active and state", function() {
        expect(keys.active).toEqual([{active:true}]);
        expect(keys.state.active).toEqual("active");
      });

      xit("should call Filter and Data actions", function() {
        expect(FilterAction.changeKey).toHaveBeenCalledWith("phil_collins");
        expect(DataAction.keyUpdate).toHaveBeenCalled();
      });
    });
  });

});