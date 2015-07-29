
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

  checkCache(val, keys){
    if (_.isEmpty(this.cache)){
      return false;
    }
    // console.log(this.cache)
    return  this.cache.text === val && (_.difference(keys, this.cache.keys).length === 0);
  }

  checkFilters(opts, filter){
    // let check = false;
    // _.forEach(filters, (filter)=>{
    // console.count()
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

  checkCacheFilters(filters){

    if(!this.cache.filters){
      return false;
    }

    // f = this.cache.filters
    let check = true;
    _.forEach(filters, (f)=>{
      let cached = _.find(this.cache.filters, (c)=>{
        return c.filter_by === f.filter_by;
      });

      if(!f.selected.equals(cached.selected)){
        check = false;
      }
    }.bind(this));

    return check;
  }

  filterSearch(filters){
    this.cache.filters = filters;
    filters = _.where(filters, {all:false});
    let search = this.data;

    if(filters.length > 0){
      _.forEach(filters, (filter)=>{
        search = search.filter((d)=>{
          return this.checkFilters(d.get("filters"), filter);
        }.bind(this));

      }.bind(this));
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
      return data.get(keys);
    }
  }

  searchTxt(regex, data, keys){
    let values = this.getValues(data, keys);

    if(values){
      return (String(values).search(regex) > -1);
    }

    return true;
  }

  search(val, keys, filters){
    let search;
    if(this.checkCache(val, keys) && this.checkCacheFilters(filters)){
      return this.cache.fullSearch;
    }
    //Runs filters over data
    search = (this.checkCacheFilters(filters)) ? this.cache.filterSearch : this.filterSearch(filters);

    //Runs Search over data
    if(!_.isEmpty(val)){
      search =  this.getSearch(search, val, keys);
    }

    this.cache.fullSearch = search; // Caches search
    return search;

  }
}

module.exports = DataFcty;
