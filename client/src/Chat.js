import React, { Component } from 'react';
import { addMessage, getMessages, onMessageAdded } from './graphql/queries';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.state = { messages: [] };
    this.subscription = null;
  }

  async componentDidMount() {
    const messages = await getMessages();
    this.setState({ messages });
    this.subscription = onMessageAdded((message) => {
      const updatedMessages = this.state.messages.concat(message);
      this.setState({ messages: updatedMessages });
    });
  }

  componentWillUnmount() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async handleSend(text) {
    await addMessage(text);
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
