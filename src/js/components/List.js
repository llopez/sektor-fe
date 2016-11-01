import React from 'react';
import Item from './Item';
import Store from './../Store';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: Store.get().list};
  }

  componentWillMount() {
    Store.on('change', function(){
      this.setState({items: Store.get().list});
    }.bind(this));
  }

  render() {
    let items = Object.keys(this.state.items).map(function(k) {
      let i = this.state.items[k];
      return <Item key={k} id={k} title={i.title} artist={i.artist} time={i.time} size={i.size} bitrate={i.bitrate} link={i.link} />;
    }.bind(this));

    return (
      <div>
        {(function() {
          if(items.length > 0){
            return <table className="table">
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
                   </table>;
          }
        })()}
      </div>
    );
  }
}
