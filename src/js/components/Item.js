import React from 'react';

export default class Item extends React.Component {

  constructor(props) {
    super(props);
  }

  _formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds - min * 60;
    return min + "m " + sec + "s";
  }

  _formatSize(kilobytes) {
    let mb = Math.floor(kilobytes / 1024);
    return mb + "mb"
  }

  render() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.artist}</td>
        <td>{this._formatTime(this.props.time)}</td>
        <td>{this._formatSize(this.props.size)}</td>
        <td>{this.props.bitrate}</td>
        <td><a className="button is-danger" href={this.props.link}>Download</a></td>
      </tr>
    );
  }
}
