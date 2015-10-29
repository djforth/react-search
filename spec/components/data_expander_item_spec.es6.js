var React        = window.React  = require("react");

const DataExpander   = require("../../src/components/data_expander_item");

const Immutable = require("immutable");

// Test Helpers
const TestUtils       = React.addons.TestUtils;
const componentHelper = require("react-jasmine").componentHelpers;
const storeListeners = require("react-jasmine").checkListeners

describe("DataExpander", function() {
  let dataexpander, cssMixins, spy, revert, ColumnsStore;;
  let data = Immutable.fromJS({foo:"Phil", bar:"Collins"})
  let keys = ["foo", "bar"];
  let css  = {foo:"class1", default:"class2"}
  let columns = [
    {key:"foo", title:"Foooo"},
    {key:"Bar", title:"Baaaaar"}
  ]
  let colStubs = [
    {title:"addChangeListener"},
    {title:"removeChangeListener"},
    {title:"getKeyAndTitle", returnValue:columns},
    {title:"getShowable", returnValue:[columns[0]]}
  ]
  beforeEach(() => {

    //Spy on Store
    ColumnsStore = DataExpander.__get__("ColumnsStore");
    storeListeners.stubStore(ColumnsStore, colStubs);

    dataexpander = TestUtils.renderIntoDocument(<DataExpander data={data} css={css} keys={keys} /> );

    spyOn(dataexpander, "checkCss").and.callThrough();


    dataexpander.forceUpdate();
  });

  afterEach(function() {
    dataexpander.checkCss.calls.reset();
  });

  it("renders", () => {
    expect(dataexpander).toBeTruthy();
  });

  describe("props and state defaults", function() {
    var propsDefaults = {
        css  : css,
        keys : keys,
        data : data
      };

    var stateDefaults = {
        acc_css : "collapse",
        active  : "",
        chevron :"glyphicon glyphicon-chevron-down",
        css: "col-md-1",
        data    : data,
        device: "desktop",
        selected: false,
        show_additional: false
      };

    componentHelper.checkPropsAndState(()=>{
      return dataexpander;
    }, propsDefaults, stateDefaults);
  });

  describe('expander', function() {
    componentHelper.checkEvent(
      ()=>{
        return dataexpander;
      },
      {type:"tag", identifier:"a"},
      "_onClick",
      "click"
    );

    describe("check _onClick function", function() {

      beforeEach(()=>{
        spy = jasmine.createSpyObj("e", ["preventDefault"]);
        dataexpander.active = [{active:false}]
        spyOn(dataexpander, "setState").and.callFake((state)=>{
          dataexpander.state = state;
        });
        dataexpander._onClick(spy);


      });

      it("should call set state", function() {
        expect(dataexpander.setState).toHaveBeenCalled();
      });

      it("should call preventDefault", function() {
        expect(spy.preventDefault).toHaveBeenCalled();
      });

      it("should set active and state", function() {
        expect(dataexpander.active).toEqual([{active:true}]);
        expect(dataexpander.state.active).toEqual("active");
      });

      it("should set active and state", function() {
        expect(dataexpander.active).toEqual([{active:true}]);
        expect(dataexpander.state.active).toEqual("active");
      });

      it("should set answer and state", function() {
        expect(dataexpander.answer).toEqual(["collapse", {"in": true}]);
        expect(dataexpander.state.acc_css).toEqual("collapse in");
      });

      it("should set chevron and state", function() {
        expect(dataexpander.chevron).toEqual(["glyphicon", {"glyphicon-chevron-up": true}, {"glyphicon-chevron-down": false}]);
        expect(dataexpander.state.chevron).toEqual("glyphicon glyphicon-chevron-up");
      });

      it("should set show_additional", function() {
        expect(dataexpander.state.show_additional).toBeTruthy();
      });

  });
  });

  describe('render functions', function() {

    describe('renderAll', function() {

      it("should return empty string if no data", function() {
        dataexpander.props.data = null;
        let a = dataexpander.renderAll();
        expect(a).toEqual("");
      });

      it("should be defined", function() {
        spyOn(dataexpander, "renderItem").and.callFake((c, i)=>{
          return i.get(c.key);
        });

        let a = dataexpander.renderAll();
        expect(a).toEqual(["Phil"]);
      });

    });

    describe('renderAdditional', function() {
      describe('when state.show_additional is false', function() {
        it("should return empty string", function() {
          expect(dataexpander.renderAdditional()).toEqual("");
        });
      });

      describe('when state.show_additional is true', function() {
        let item, node
        beforeEach(function() {

          dataexpander.state.show_additional = true;
          spyOn(dataexpander, "renderAll").and.returnValue(
            <li>Phil</li>
          );

          let c = React.cloneElement(dataexpander.renderAdditional());
          item   = TestUtils.renderIntoDocument(c);
          node = item.getDOMNode();
        });

        it("should be defined", function() {
          expect(item).toBeDefined();
        });

        it("call renderAll", function() {
          expect(dataexpander.renderAll).toHaveBeenCalled();
        });

        componentHelper.checkAttrbutes(()=>{
          return node;
        }, [{key:"class", value:"list-group collapse"}]);

        componentHelper.checkText(()=>{
          return node.querySelector("li");
        }, "Phil");
      });


    });

    describe('renderDate', function() {
      let item
      beforeEach(function() {
        spyOn(dataexpander, "displayData").and.returnValue("Phil");

        let c = React.cloneElement(dataexpander.renderItem(columns[0], data));
        item   = TestUtils.renderIntoDocument(c);
        // console.log("col", col.getDOMNode());
      });

      it("should be defined", function() {
        expect(item).toBeDefined();
      });

      componentHelper.checkText(()=>{
        return item.getDOMNode();
      }, "Foooo: Phil");
    });


    describe('renderShowButton', function() {
        describe('when active', function() {
          let item, node;
          beforeEach(function() {
            dataexpander.state.active = false;
            let c = React.cloneElement(dataexpander.renderShowButton());
            item   = TestUtils.renderIntoDocument(c);
            node = item.getDOMNode();
          });

          it("should be defined", function() {
            expect(item).toBeDefined();
          });


          componentHelper.checkAttrbutes(()=>{
            return node;
          }, [{key:"class", value:"class2"}]);

          componentHelper.checkText(()=>{
            return node.querySelector("a").firstChild;
          }, "More");

          // it("should have contain the text More", function() {
          //   let elm = node.querySelector("a").firstChild;

          //   // elm.querySelector("i"));
          //   console.log(elm, elm.textContent.replace(" ", ""));
          //   expect(elm.textContent).toEqual("More");
          // });

        });

      });

  });


});