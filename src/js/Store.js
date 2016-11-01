import EventEmitter from 'events';

let _list = {
  items: {},
};

const Store = Object.assign({}, EventEmitter.prototype, {

  get: function() {
    return {
      list: _list
    };
  }

});

export default Store;
