// require("babelify/polyfill");

const sinon     = require("sinon");
const _         = require("lodash");
const Immutable = require("immutable");

const createEl = require("react-jasmine").createElement;

const DataFcty  = require("../../src/factories/data_fcty");

let filters = [
  {
    filter_by:"color",
    selected:Immutable.fromJS(
      [
        {
          id:1,
          title:"green",
          selected:true
        }
      ]
    )
  }
]

let mockdata = require("../data/data");


describe("DataFcty", function() {

   let dataFcty;

   beforeEach(function(){
      dataFcty = new DataFcty({}, mockdata)
   });

   it("getIds", function() {

     let ids = dataFcty.getIds(filters[0].selected)
     expect(ids).toEqual([1])
   });

   it("should return true if filter option is present", function() {
     let item = dataFcty.data.first();
     item = item.get("filter_options")
     item = item.set("color", 1)
     spyOn(dataFcty, "getIds").and.returnValue([1])
     spyOn(dataFcty, "checkIds").and.returnValue(true)


     let test = dataFcty.checkFilters(item, filters[0]);

     expect(test).toBeTruthy();
     expect(dataFcty.getIds).toHaveBeenCalledWith(filters[0].selected);
     expect(dataFcty.checkIds).toHaveBeenCalledWith([1], 1)


   });

   it("should return false if filter option is not present", function() {
     let item = dataFcty.data.first();
     item = item.get("filter_options")
     item = item.set("color", 1)
     spyOn(dataFcty, "getIds").and.returnValue([2])

     let test = dataFcty.checkFilters(item, filters);

     expect(test).toBeFalsy();

   });

   describe("when search text", function() {
      let regex, data, keys;
      beforeEach(()=>{
        data  = dataFcty.data.get(0)
        keys  = ["title", "instruments"];
        // spyOn(dataFcty, "getValues").and.returnValue()
      })

      it("should return true if matches", ()=> {
        spyOn(dataFcty, "getValues").and.returnValue("Foo banks");
        regex = new RegExp("Banks", "i");
        let test = dataFcty.searchTxt(regex, data, keys);

        expect(dataFcty.getValues).toHaveBeenCalledWith(data, keys);
        expect(test).toBeTruthy();
      });


      it("should return false if not matches", ()=> {
        spyOn(dataFcty, "getValues").and.returnValue("banks");
        regex = new RegExp("Foo", "i");

        let test = dataFcty.searchTxt(regex, data, keys);
        expect(dataFcty.getValues).toHaveBeenCalledWith(data, keys);
        expect(test).toBeFalsy();
      });



   });

  describe("getValues", function() {
    let data, keys
      beforeEach(()=>{
        data  = dataFcty.data.get(0)
        keys  = ["title", "instruments"];
      })

      it("should return the correct data for key", function() {
        let value = dataFcty.getValues(data, "title");
        expect(value).toEqual(data.get("title"));
      });

      it("should return combined data", function() {
        let value    = dataFcty.getValues(data, keys);
        let combined = `${data.get("title")} ${data.get("instruments")}`;

        expect(value).toEqual(combined);

      });

      it("should only return combined string of keys", function() {
        data = data.set("foo", "bar");
        let value    = dataFcty.getValues(data, ["title", "foo"]);
        let combined = `${data.get("title")} bar`;

        expect(value).toEqual(combined);
      });
  });

  describe("when search", function() {
    it("should return true if search filter & filter is true", function() {
      spyOn(dataFcty, "searchTxt").and.returnValue(true);
      spyOn(dataFcty, "checkFilters").and.returnValue(true)

      let data = dataFcty.search("foo", ["key"], filters)

      expect(data.size).toEqual(17);
    });

    xit("should return false if search filter is true & filter is false", function() {
      spyOn(dataFcty, "searchTxt").and.returnValue(true);
      spyOn(dataFcty, "checkFilters").and.returnValue(false);

      // let data = dataFcty.search("foo", ["key"], filters)

      // expect(data.size).toEqual(0);
    });

    it("should return false if search filter is false & filter is true", function() {
      spyOn(dataFcty, "searchTxt").and.returnValue(false);
      spyOn(dataFcty, "checkFilters").and.returnValue(true);

      let data = dataFcty.search("foo", ["key"], filters)

      expect(data.size).toEqual(0);
    });

    it("should return false if search filter is false & filter is false", function() {
      spyOn(dataFcty, "searchTxt").and.returnValue(false);
      spyOn(dataFcty, "checkFilters").and.returnValue(false);

      let data = dataFcty.search("foo", ["key"], filters)

      expect(data.size).toEqual(0);
    });
  });

});

