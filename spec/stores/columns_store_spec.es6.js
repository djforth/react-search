
const ColumnsStore = require('../../src/stores/columns_store');

const storeHelper    = require("react-jasmine").storeHelpers;
const defaultsHelper = require("react-jasmine").checkDefaults;

const _         = require('lodash');
const Immutable = require('immutable');

let mockdata = [
  {key:"id"},
  {key:"assigned_to_name", title:"Assigned to", searchable:true},
  {key:"region_title", title:"Region", searchable:true, sortable:true},
  {key:"requester_name", title:"Requested By", desktop:true, mobile:true, tablet:true, searchable:true},
  {key:"request_made", title:"Request made on", type:"date", fmt:"%d/%m/%Y", searchable:true},
  {key:"required_by", title:"Required by", type:"dateTime", fmt:"%d/%m/%Y %H:%M", desktop:true, mobile:true, tablet:true, searchable:true},
  {key:"expected_returned", title:"expected_returned", type:"dateTime", fmt:"%d/%m/%Y %H:%M", searchable:true},
  {key:"status", desktop:true, tablet:true},
  {key:"company_name", title:"Company", desktop:true},
  {key:"actions", title:"Actions", desktop:true, mobile:true, tablet:true}
];

let final = _.map(_.cloneDeep(mockdata), (col)=>{
      if(!_.has(col, "title")){
        _.set(col, "title", col.key.replace(/^./, (match)=> match.toUpperCase()))
      }

      return col
    });

let tablet = _.where(final, {tablet:true});


describe('ColumnsStore', function() {

  beforeEach(()=>{
    mockdata = [
      {key:"id"},
      {key:"assigned_to_name", title:"Assigned to", searchable:true},
      {key:"region_title", title:"Region", searchable:true, sortable:true},
      {key:"requester_name", title:"Requested By", desktop:true, mobile:true, tablet:true, searchable:true},
      {key:"request_made", title:"Request made on", type:"date", fmt:"%d/%m/%Y", searchable:true},
      {key:"required_by", title:"Required by", type:"dateTime", fmt:"%d/%m/%Y %H:%M", desktop:true, mobile:true, tablet:true, searchable:true},
      {key:"expected_returned", title:"expected_returned", type:"dateTime", fmt:"%d/%m/%Y %H:%M", searchable:true},
      {key:"status", desktop:true, tablet:true},
      {key:"company_name", title:"Company", desktop:true},
      {key:"actions", desktop:true, mobile:true, tablet:true}
    ];
  })

  let options = [
    {
      func:"addColumns",
      action:{
        type:"ADDING_COLUMNS",
        columns:"foo"
      },
      args:"foo",
      change:"adding"
    },
    {
      func:"changeDevice",
      action:{
        type:"CHANGE_DEVICE",
        device:"desktop"
      },
      args:"desktop",
      change:"change"
    }
  ];

  storeHelper.checkDispatcher(ColumnsStore, "registeredCallback", options)

  storeHelper.checkChangeEvents(()=>{
    return ColumnsStore.__get__("store");
  });

  describe('store functions', function() {
    let store, columns

    beforeEach(()=>{
      store  = ColumnsStore.__get__("store");
    });

    describe('setting functions', function() {

      it("should add columns to store", function() {
        spyOn(store, "setVisibleColumns");
        spyOn(store, "setTitles").and.returnValue(final);
        store.addColumns(mockdata);
        expect(store.columns).toEqual(final);
        expect(store.setTitles).toHaveBeenCalledWith(mockdata);
        expect(store.setVisibleColumns).toHaveBeenCalledWith("desktop");
      });

      it("should set device", function() {
        spyOn(store, "setVisibleColumns");
        store.changeDevice("mobile");
        expect(store.device).toEqual("mobile");
        expect(store.setVisibleColumns).toHaveBeenCalledWith("mobile");
      });

      it("should set visible columns", function() {
        store.columns = final;
        store.setVisibleColumns("tablet");
        expect(store.visible_columns).toEqual(tablet)
      });

      it("should set titles", function() {
        let result = store.setTitles(mockdata);
        expect(result).toEqual(final)
      });

      it("should take and object and return only relevant keys", function() {
        let data = {key:"required_by", title:"Required by", type:"dateTime", fmt:"%d/%m/%Y %H:%M", desktop:true, mobile:true, tablet:true, searchable:true};

        let obj = store.reduceObj(data, ["key", "title"])
        expect(obj).toEqual({key:"required_by", title:"Required by"})
      });
    });


    describe("get functions", function() {
      beforeEach(function() {
        store.columns         = final;
        store.visible_columns = tablet;
      });

      it("should get visible keys for correct device", function() {
        let keys = store.getKeys();
        expect(keys).toEqual(["requester_name", "required_by", "status", "actions"]);
      });

      it("should get visible titles for correct device", function() {
        let titles = store.getTitles();
        expect(titles).toEqual(["Requested By", "Required by", "Status", "Actions"]);
      });

      it("should return title for a specific key", function() {
        let title = store.getTitleForKey("requester_name");
        expect(title).toEqual("Requested By")
      });


      it("should get date columns", function() {
        let dates = store.getDateColumns();
        expect(dates.length).toEqual(3)
        expect(dates).toContain({key:"request_made", title:"Request made on", type:"date", fmt:"%d/%m/%Y"});
        expect(dates).toContain({key:"required_by", title:"Required by", type:"dateTime", fmt:"%d/%m/%Y %H:%M"});
        expect(dates).toContain({key:"expected_returned", title:"expected_returned", type:"dateTime", fmt:"%d/%m/%Y %H:%M"});
      });

      it("should return searchable keys", function() {
        let searchable = store.getSearchable();
        expect(searchable.length).toEqual(6);
        let titles = _.pluck(searchable, "title");
        expect(titles).toEqual(["Assigned to", "Region", "Requested By", "Request made on", "Required by", "expected_returned"]);
        let keys = _.keys(searchable[0]);
        expect(keys).toEqual(["key", "title"]);
      });

       it("should return searchable keys", function() {
        let sortable = store.getSortable();
        expect(sortable.length).toEqual(1);
        expect(sortable).toEqual([{key:"region_title", title:"Region"}])
      });
    });

  })
});