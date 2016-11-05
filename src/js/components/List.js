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
    Store.setData("processing", true);
    Store.fetchPage();
  }

  render() {
    let items = Object.keys(this.state.list).map(function(k) {
      let i = this.state.list[k];
      return <Item key={k} id={k} title={i.title} artist={i.artist} time={i.time} size={i.size} bitrate={i.bitrate} link={i.link} />;
    }.bind(this));

    if(items.length == 0){
      return null;
    }

    let buttonClassName = "button";

    if(this.state.processing){
      buttonClassName += " is-loading";
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
        {(function() {
          if(!this.state.lastPage) {
            return <a className={buttonClassName} onClick={this._loadMore}>load more</a>;
          }
        }.bind(this))()}
      </div>
    );
  }
}
