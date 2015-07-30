
const BasketStore = require("../../src/stores/basket_store");

const storeHelper    = require("react-jasmine").storeHelpers;

const defaultsHelper = require("react-jasmine").checkDefaults

const _         = require("lodash");
const Immutable = require("immutable");

describe("BasketStore", function() {

  let options = [
    {
      func:"addItem",
      action:{
        type:"ADD_TO_BASKET",
        data:"foo"
      },
      args:"foo",
      change:"adding"
    },
    {
      func:"removeItem",
      action:{
        type:"REMOVE_FROM_BASKET",
        data:"foo"
      },
      args:"foo",
      change:"remove"
    }
  ];

  storeHelper.checkDispatcher(BasketStore, "registeredCallback", options)

  storeHelper.checkChangeEvents(()=>{
    return BasketStore.__get__("store");
  });

  describe("store functions", function() {
    let store, basket, basket_ids, DataStore;
    let data          = [{title:"foo", id:1}, {title:"Bar", id:2}];
    let immutableData = Immutable.fromJS(data);
    let ids           = [1, 2];

    beforeEach(()=>{
      store  = BasketStore.__get__("store");
      // basket = BasketStore.__get__("basket");
      // basket_ids  = BasketStore.__get__("basket_ids");
      DataStore = BasketStore.__get__("DataStore");
    })

    describe("addByIds", function() {
      beforeEach(function() {
        spyOn(store.basket, "add");
      });

      it("should return samples and sample ID's", function() {
        spyOn(DataStore, "getByIds").and.returnValue(immutableData);
        let items =  store.addByIds(ids)

        expect(DataStore.getByIds).toHaveBeenCalledWith(ids);
        expect(store.basket.add).toHaveBeenCalledWith(data);

        expect(items.samples).toEqual(immutableData);
        expect(items.sample_ids).toEqual(ids);
      });

      it("should not return samples if no ID's", function() {
        spyOn(DataStore, "getByIds").and.returnValue(null);
        let items =  store.addByIds(ids)

        expect(DataStore.getByIds).toHaveBeenCalledWith(ids);
        expect(store.basket.add).not.toHaveBeenCalled();

        expect(items.samples).toEqual(null);
        expect(items.sample_ids).toEqual(ids);
      });
    });

    describe("add/remove Item", function() {
      beforeEach(function() {
        spyOn(store.basket, "add");
        spyOn(store.basket, "remove");
      });

      it("should add to basket", function() {
        store.addItem("foo");
        expect(store.basket.add).toHaveBeenCalledWith("foo");
      });

      it("should remove from basket", function() {
        store.removeItem("foo");
        expect(store.basket.remove).toHaveBeenCalledWith("foo");
      });
    });

    describe("getData", function() {
      beforeEach(function() {
        spyOn(store.basket, "getAll").and.returnValue(immutableData);
      });

      it("should return samples and list", function() {
        let items =  store.getData();

        expect(store.basket.getAll).toHaveBeenCalled();
        expect(store.basket_ids).toEqual(ids);

        expect(items.samples).toEqual(immutableData);
        expect(items.sample_ids).toEqual(ids)
      });
    });

    describe("add Selected", function() {
      beforeEach(function() {
        spyOn(DataStore, "selectedIds");
      });

      it("should add to selected store", function() {
        store.addSelected(ids);
        // console.log("ids", store.basket_ids);
        expect(store.basket_ids).toEqual(ids);
        expect(DataStore.selectedIds).toHaveBeenCalledWith(ids)
      });
    });
  });



});
