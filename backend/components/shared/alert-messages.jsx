import React from 'react';
import emitter from '../../emitter.jsx';

class AlertMessages extends React.Component {

  constructor(props) {
    super();
    this.state = { messages: undefined };

    this.subscription = emitter.addListener(props.event, this.setMessage.bind(this));
  }

  setMessage(messages) {
    this.setState({ messages: messages });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  render() {
    if (this.state.messages === undefined) {
      return <div />;
    }

    return (
      <div className={`alert alert-${this.props.alertType}`} role="alert">
        {this.state.messages}
      </div>
    );
  }
}

export default AlertMessages;