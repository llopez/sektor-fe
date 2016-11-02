import React from 'react';
import Store from './../Store';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: { term: '' }, processing: false};
    this._handleSubmit = this._handleSubmit.bind(this);
    this._setData = this._setData.bind(this);
  }

  componentWillMount() {
    Store.on('change', function(){
      this.setState({processing: false});
    }.bind(this));
  }

  _handleSubmit(e) {
    e.preventDefault();
    Store.clear();
    this.setState({processing: true});
    Store.fetchAll(this.state.data.term);
  }

  _setData(e) {
    let data = {}
    data[e.target.name] = e.target.value;
    this.setState({data: data});
  }

  // Prevents submitting the form by pressing Enter
  _doNothing(e){
    if(e.keyCode == 13){
      e.preventDefault();
    }
  }

  render() {
    let buttonClassName = "button is-info is-large";
    if (this.state.processing) {
      buttonClassName += " is-loading";
    }

    return (
      <form onSubmit={this._handleSubmit}>
        <p className="control has-addons">
          <input className="input is-large is-expanded" type="text" name="term" value={this.state.data.term} onChange={this._setData} onKeyDown={this._doNothing}/>
          <button className={buttonClassName}>
            Search
          </button>
        </p>
      </form>
    );
  }
}
