import React, { Component } from 'react';

export class MessageList extends Component {
  boxRef = React.createRef();

  componentDidUpdate() {
    const box = this.boxRef.current;
    // scroll to bottom to make the last message visible
    box.scrollTo(0, box.scrollHeight);
  }

  renderMessage = (message) => {
    const { user } = this.props;
    const tag = 'tag';
    const className = message.from === user ? `${tag} is-link` : tag;
    return (
      <tr key={message.id}>
        <td><span className={className}>{message.from}</span></td>
        <td style={{paddingLeft: '0.75em'}}>{message.text}</td>
      </tr>
    )
  }

  render() {
    const { messages } = this.props;
    return (
      <div
        ref={this.boxRef}
        className="box"
        style={{height: '60vh', overflowY: 'auto'}}
      >
        <table>
          <tbody>
            {messages.map(this.renderMessage)}
          </tbody>
        </table>
      </div>
    );
  }
}
