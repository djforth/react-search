
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

  checkDataIds(d){
    if(_.isArray(d)){
      return !_.isEmpty(d);
    } else {
      return _.isNumber(d);
    }
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

  checkCachedDateRanges(dateRanges){
    let check = this.checkEmptyOrCached(dateRanges, "dateRanges");

    if(_.isBoolean(check)){
      return check;
    }

    check = true;
    let cacheDR = this.cache.dateRanges;

    _.forIn(dateRanges, (v, k)=>{
      let dr = cacheDR[k];

      if(v.st !== dr.st || v.fn !== dr.fn){
        check = false;
        return false;
      }
    });

    return check;
  }

  checkCacheFilters(filters){

    let check = this.checkEmptyOrCached(filters, "filters");

    if(_.isBoolean(check)){
      return check;
    }

    check = true;
    _.forEach(filters, (f)=>{
      let cached = this.getFilterByKey("filter_by", f.filter_by);

      if(!f.selected.equals(cached.selected)){
        check = false;
        return false;
      }
    });

    return check;
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
    let ids = opts.get(filter.filter_by);

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
    this.cache.filters = filters;

    filters = _.where(filters, {all:false});
    // let search = this.data;

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
    }.bind(this));

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
    let cachedTxt  = this.checkCacheText(values.text, values.keys);
    let cachedFltr = this.checkCacheFilters(values.filters);
    let cachedDR   = this.checkCachedDateRanges(values.dateRanges);

    if(cachedTxt && cachedFltr && cachedDR){
      return this.cache.fullSearch;
    }
    let search = this.data;
    //Runs filters over data
    if(!_.isEmpty(values.filters)){
      search = (cachedFltr) ? this.cache.filterSearch : this.filterSearch(search, values.filters);
    }

    //Runs Date Range search
    if(!_.isEmpty(values.dateRanges)){
      search = (cachedFltr && cachedDR) ? this.cache.dateRangesSearch : this.dateRangeSearch(search, values.dateRanges);
    }

    //Runs Search over data
    if(!_.isEmpty(values.text)){
      search =  this.getSearch(search, values.text, values.keys);
    }

    this.cache.fullSearch = search; // Caches search
    return search;

  }

  setValues(...args){
    let values = {};
     _.forEach(args, (arg)=>{
      if(_.isString(arg)){
        values.text = arg;
      }

      if(_.isArray(arg)){
        let fst = _.first(arg);
        if( _.isString(fst) ){
          values.keys = arg;
        }

        if( _.isObject(fst) ){
          values.filters = arg;
        }
      }

      if( _.isObject(arg) && !_.isArray(arg)){
        values.dateRanges = arg;
      }
    });
    _.defaults(values,
      { "text": "" },
      { "keys": [] },
      { "filters": [] },
      { "dateRanges":{} });
    return values;
  }
}

module.exports = DataFcty;
