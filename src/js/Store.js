import EventEmitter from 'events';

let _state = {
  term: '',
  page: 1,
  list: {}
};

const Store = Object.assign({}, EventEmitter.prototype, {
  fetchAll: function(term) {
    let q = encodeURIComponent(term)
    fetch('http://sektor-api.luigibyte.com.ar/api/v1/tracks?q=' + q, {
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
      this.emit('change');
    }.bind(this));
  },

  clear: function() {
    _state['list'] = {};
    this.emit('change');
    return true;
  },

  getState: function() {
    return _state;
  },

  setData: function(name, value) {
    _state[name] = value;
    this.emit('change');
  },
});

export default Store;
window.Store = Store;
