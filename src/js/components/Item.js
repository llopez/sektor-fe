import React from 'react';

export default class Item extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.artist}</td>
        <td>{this.props.time}</td>
        <td>{this.props.size}</td>
        <td>{this.props.bitrate}</td>
        <td><a href={this.props.link}>Download</a></td>
      </tr>
    );
  }
}
