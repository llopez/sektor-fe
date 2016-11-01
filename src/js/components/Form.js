import React from 'react';
import Store from './../Store';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { term: '' } };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._setData = this._setData.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    Store.clear();
    Store.fetchAll(this.state.data.term);
  }

  _setData(e) {
    let data = {}
    data[e.target.name] = e.target.value;
    this.setState({data: data});
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <p className="control has-addons">
          <input className="input is-large is-expanded" type="text" name="term" value={this.state.data.term} onChange={this._setData}/>
          <button className="button is-info is-large">
            Search
          </button>
        </p>
      </form>
    );
  }
}
