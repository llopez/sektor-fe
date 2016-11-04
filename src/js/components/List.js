import React from 'react';
import Item from './Item';
import Store from './../Store';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getState();
  }

  componentWillMount() {
    Store.on('change', function(){
      this.setState(Store.getState());
    }.bind(this));
  }

  _loadMore() {
    console.log('more...');
    //Store.fetchAll(this.state.term, this.state.page + 1);
  }

  render() {
    let items = Object.keys(this.state.list).map(function(k) {
      let i = this.state.list[k];
      return <Item key={k} id={k} title={i.title} artist={i.artist} time={i.time} size={i.size} bitrate={i.bitrate} link={i.link} />;
    }.bind(this));

    if(items.length == 0){
      return null;
    }

    return (
      <div className="has-text-centered">
      <table className="table">
      <thead>
      <tr>
      <th>Title</th>
      <th>Artist</th>
      <th>Time (sec)</th>
      <th>Size (kb)</th>
      <th>Bitrate</th>
      <th></th>
      </tr>
      </thead>
      <tbody>
      { items }
      </tbody>
      </table>
      <a className="button" onClick={this._loadMore}>load more</a>
      </div>
    );
  }
}
