import React, { Component } from 'react';
import { addMessage, getMessages } from './graphql/queries';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.state = { messages: [] };
  }

  async componentDidMount() {
    const messages = await getMessages();
    this.setState({ messages });
  }

  async handleSend(text) {
    const message = await addMessage(text);
    const updatedMessages = this.state.messages.concat(message);
    this.setState({ messages: updatedMessages });
  }

  render() {
    const { user } = this.props;
    const { messages } = this.state;
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Chatting as {user}</h1>
          <MessageList user={user} messages={messages} />
          <MessageInput onSend={this.handleSend} />
        </div>
      </section>
    );
  }  
}
