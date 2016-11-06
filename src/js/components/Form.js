import React from 'react';
import Store from './../Store';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { term: Store.getState().term }, 
      processing: Store.getState().processing
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._setTerm = this._setTerm.bind(this);
  }

  componentWillMount() {
    Store.on('change', function(){
      this.setState({
        data: { term: Store.getState().term },
        processing: Store.getState().processing
      });
    }.bind(this));
  }

  _handleSubmit(e) {
    e.preventDefault();
    Store.clear();
    Store.setData("processing", true);
    Store.fetchPage();
  }

  _setTerm(e) {
    Store.setData("term", e.target.value);
  }

  // Prevents submitting the form by pressing Enter
  _doNothing(e){
    if(e.keyCode == 13){
      e.preventDefault();
    }
  }

  render() {
    let buttonClassName = "button is-info";
    if (this.state.processing) {
      buttonClassName += " is-loading";
    }

    return (
      <form onSubmit={this._handleSubmit}>
        <p className="control has-addons">
          <input className="input is-large is-hidden-mobile is-expanded" type="text" name="term" value={this.state.data.term} onChange={this._setTerm} onKeyDown={this._doNothing}/>
          <input className="input is-expanded is-hidden-tablet" type="text" name="term" value={this.state.data.term} onChange={this._setTerm} onKeyDown={this._doNothing}/>
          <button className={buttonClassName + " is-large is-hidden-mobile"}>Search</button>
          <button className={buttonClassName + " is-hidden-tablet"}>Search</button>
        </p>
      </form>
    );
  }
}
