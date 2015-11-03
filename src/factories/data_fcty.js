
const _           = require("lodash");
const DataManager = require("datamanager");

class DataFcty extends DataManager {

  init(){
    this.cache = {};
    this.pagination = 50;
    this.page       = 1;
    this.itemNo     = 0;
    this.current_search = null;
  }



  addSelected(ids){
    if(this.checkDataIds(ids)){
      this.addToHistory();
      this.data = this.data.map((d)=>{
        let selected = false;
        let id = d.get("id");
        if(_.isArray(ids)){
          selected = _.contains(ids, id);
        } else {
          selected = ids === id;
        }

        d = d.set("selected", selected);
        return d;
      });
    }

  }

  setApi(uri){
    this.url = uri;
  }

  cachedChecker(values){
    let checker =  {
      text      : this.checkCacheText(values("text"), values("keys")),
      filters   : this.checkCacheFilters(values("filters")),
      daterange : this.checkCachedDateRanges(values("dateRanges"))
    }

    let checkAll = function(){
      return _.reduce(_.values(checker), (t, n)=>{
        return (n && t);
      });
    }

    return function(key){
      return (key === "all") ? checkAll() : checker[key];
    }
  }

  checkCache(items, key){
    let check = this.checkEmptyOrCached(items, key);
    if(_.isBoolean(check)){
      return check;
    }

    return (tester)=>{
      return tester(items);
    }
  }

  checkDataIds(d){
    if(_.isArray(d)){
      return !_.isEmpty(d);
    } else {
      return _.isNumber(d);
    }
  }

  checkCachedDateRanges(dateRanges){
    let checker = this.checkCache(dateRanges, "dateRanges");

    if(_.isBoolean(checker)){
      return checker;
    }

    let checkDates = (fir, sec)=>{
      return fir !== sec;
    }

    let checkStFn = (cur, cache)=>{
      return checkDates(cur.st, cache.st)
             || checkDates(cur.fn, cache.fn);
    }

    return checker((item)=>{
      let cached = this.cache.dateRanges;

      _.forIn(dateRanges, (v, k)=>{
        if(checkStFn(v, _.get(cached, k))){
          check = false;
          return false;
        }
      });

      return check;
    })


    // let check = this.checkEmptyOrCached(dateRanges, "dateRanges");

    // if(_.isBoolean(check)){
    //   return check;
    // }

    // check = true;
    // let cacheDR = this.cache.dateRanges;

    // _.forIn(dateRanges, (v, k)=>{
    //   let dr = cacheDR[k];

    //   if(v.st !== dr.st || v.fn !== dr.fn){
    //     check = false;
    //     return false;
    //   }
    // });

    // return check;
  }

  checkCacheFilters(filters){
    let checker = this.checkCache(filters, "filters")

    if(_.isBoolean(checker)){
      return checker;
    }

    let checkTest = (item)=>{
      let cached = this.getFilterByKey("filter_by", item.filter_by);
      return !(item.selected.equals(cached.selected))
    }

    return checker((item)=>{
      let check = true;
      _.forEach(items, (i)=>{
        if(checkTest(i)){
          check = false;
          return false;
        }
      });

      return check;
    })
  }


  checkCacheText(val, keys){
    let checkKeys = this.checkEmptyOrCached(keys, "keys");
    if (_.isBoolean(checkKeys)){
      return checkKeys;
    }

    if(!this.cache.text){
      return false;
    }

    return  this.cache.text === val && (_.difference(keys, this.cache.keys).length === 0);
  }


  checkDates(date, range){
    let test = false;
    if(_.isDate(date)){
      if((date > range.st) && (date < range.fn)){
        test = true;
      }
    }

    return test;

  }



  // Check and return filtered data
  checker(v, t, c){
    if(_.isEmpty(v)){
      return false;
    }

    let test  = t;
    let cache = c;

    console.log(v, t())
    console.log("cache <<<<", c)

    return (searchFn, ...args)=>{
      args.push(v);
      console.log(args)
      // console.log("cache", cache)
      return (test()) ? cache : searchFn.apply(this, args)
    }
  }

  checkerFilters(data, check, values){
    let filters = this.checker(values("filters"),
      ()=>{ return check("filters") },
      this.cache.filterSearch
    );

    return (filters) ? filters(this.filterSearch, data) : data;
  }

  checkerDateRanges(data, check, values){
    let dr = this.checker(()=>{
        return check("filters") && check("dateRanges")
      },
      this.cache.dateRangesSearch,
      values("dateRanges")
    );

    return (dr) ? dr(this.dateRangeSearch, data) : data;
  }

  checkTabs(){

  }

  checkEmptyOrCached(items, key){
    if(_.isEmpty(items) || !items){
      return true;
    }

    if(!this.cache[key]){
      return false;
    }

    return null;
  }



  checkFilters(opts, filter){
    let selected = this.getIds(filter.selected);
    let ids      = opts.get(filter.filter_by);

    return this.checkIds(selected, ids);
  }

  checkIds(selected, ids){
    if(_.isArray(ids)){
      if(_.intersection(selected, ids).length > 0){
        return true;
      }
    } else if(_.include(selected, ids)){
      return true;
    }

    return false;
  }


  dateRangeSearch(search, dateRanges){
    this.cache.dateRanges       = _.cloneDeep(dateRanges);
    if(!_.isEmpty(dateRanges)){
      search = search.filter((d)=>{
        let checked = false;
        _.forIn(dateRanges, (dr, key)=>{
          if(this.checkDates(d.get(key), dr)){
            checked = true;
            return false;
          }
        });

        return checked;
      });
    }

    this.cache.dateRangesSearch = search;
    return search;
  }

  filterSearch(search, filters){
    // console.log("searching filters", filters)
    this.cache.filters = filters;

    filters = _.where(filters, {all:false});

    if(filters.length > 0){
      search = search.filter((d)=>{
        let checked = false;
        _.forEach(filters, (filter)=>{
          if(this.checkFilters(d.get("filters"), filter)){
            checked = true;
            return false;
          }
        });

        return checked;
      });
    }

    this.cache.filterSearch = search;
    // console.log("searching filters", this.cache)
    return search;
  }

  filterByIds(ids){
    if(this.data){
      return this.data.filter((d)=>{
        // console.log(ids, d.get("id"));
        return _.contains(ids, Number(d.get("id")));
      });
    }
    return null;
  }

  getFilterByKey(key, keyComp){
    // console.log("filters", this.cache.filters)
    return _.find(this.cache.filters, (c)=>{
      return c[key] === keyComp;
    });
  }

  getIds(selected){
    let ids = selected.map((s)=>{
      return s.get("id");
    });

    return ids.toJS();
  }

  getSearch(data, val, keys){
    //Do search
    let regex = new RegExp(val, "i");
    let search = data.filter((d)=>{
      return this.searchTxt(regex, d, keys);
    });

    this.cache.text   = val;
    this.cache.keys   = keys;
    this.cache.search = search;

    return search;
  }

  getValues(data, keys){
    if(keys.length > 1){
      let all = data.filter((v, k)=>{
        return _.contains(keys, k);
      });
      return all.valueSeq().toJS().join(" ");
    } else {
      let k = (_.isArray(keys)) ? _.first(keys) : keys;
      return data.get(k);
    }
  }

  remove(id){
    // let del = this.findById(id);
    let del    =  super.remove(id);
    let search = this.cache.fullSearch;

    if(del && search){
      this.cache = _.mapValues(this.cache, (v)=>{

        if(v.indexOf){
          let i = v.indexOf(del);
          if(i > -1) {
            v = v.delete(i);
          }
        }
        return v;
      });

    }

    return del;
  }

  searchTxt(regex, data, keys){
    let values = this.getValues(data, keys);

    if(values){
      return (String(values).search(regex) > -1);
    }

    return false;
  }



  search(...args){
    let values = this.setValues.apply(this, args);

    //Cache Checks
    let check = this.cachedChecker(values)

    if(check("all")){
      return this.cache.fullSearch;
    }
    console.log("cache", this.cache)
    let searchData = this.checkerFilters(this.data, check, values);

    searchData = this.checkerDateRanges(searchData, check, values);

    //Runs Search over data
    if(!_.isEmpty(values("text"))){
      searchData =  this.getSearch(searchData, values("text"), values("keys"));
    }

    this.cache.fullSearch = searchData; // Caches search
    return searchData;

  }

  //Setting Default values
  setter(test, key){
    let tester = test;
    let k      = key;

    return _.curry(function(obj, arg){
      if(tester(arg)){
        obj[k] = arg
      }

      return obj
    });
  }

  createSetters(){
    let setter_array = []
    setter_array.push(this.setter((arg)=>{
      return _.isString(arg);
    }, "text"));

    setter_array.push(this.setter((arg)=>{
      return _.isArray(arg) && _.isString(_.first(arg));
    }, "keys"));

    setter_array.push(this.setter((arg)=>{
      return _.isArray(arg) && _.isObject(_.first(arg));
    }, "filters"));

    setter_array.push(this.setter((arg)=>{
      return _.isObject(arg) && _.has(arg, "filterBy");
    }, "tab"));

    setter_array.push(this.setter((arg)=>{
      return _.isObject(arg) && !_.has(arg, "filterBy");
    }, "dateRanges"));

    return setter_array;
  }

  setValues(...args){

    //Checks values
    let settings = this.createSetters();

    let values = {};
    _.forEach(args, (arg)=>{
      _.forEach(settings, (set)=>{
        set    = set(values);
        values = set(arg);
      })

    });

    _.defaults(values,
      { "text"       : "" },
      { "keys"       : [] },
      { "filters"    : [] },
      { "tab"        : {} },
      { "dateRanges" : {} });
    return function(key){
      return values[key]
    };
  }
}

module.exports = DataFcty;
