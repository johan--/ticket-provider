import React from 'react';
import AlertMessages from '../shared/alert-messages.jsx';
import ListItem from './list-item.jsx';

class List extends React.Component {

  render() {
    return (
      <div className="container-fluid tickets-list-container">
        <AlertMessages event="success" alertType="success" />
        <h2>Ticket</h2>
        {this.props.store.tickets.map(ticket =>
            <ListItem key={ticket.id} ticket={ticket} />
        )}
      </div>
    );
  }
}

export default List;