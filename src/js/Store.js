import EventEmitter from 'events';

let _state = {
  term: '',
  page: 1,
  list: {},
  processing: false,
  lastPage: false
};

const Store = Object.assign({}, EventEmitter.prototype, {
  fetchPage: function() {
    let q = encodeURIComponent(_state['term']);
    fetch('http://sektor-api.luigibyte.com.ar/api/v1/tracks?q=' + q + "&page="+ _state['page'], {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token='+ '043664231da3183b7f80d4001d159d513202ca29'
      }
    }).then(function(res){
      return res.json();
    }).then(function(res){
      res.forEach(function(data){
        _state['list'][data.id] = data;
      });
      _state['processing'] = false;

      if(res.length == 0){
        _state['lastPage'] = true;
      }else{
        _state['page'] += 1;
      }
      this.emit('change');
    }.bind(this));
  },

  clear: function(){ 
    _state['page'] = 1;
    _state['list'] = {};
    this.emit('change');
  },

  setData: function(name, value) {
    _state[name] = value;
    this.emit('change');
  },

  getState: function() {
    return _state;
  }

});

export default Store;
