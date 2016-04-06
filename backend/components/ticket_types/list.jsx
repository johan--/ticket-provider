import React from 'react';
import AlertMessages from '../shared/alert-messages.jsx';
import ListItem from './list-item.jsx';

class List extends React.Component {

  render() {
    return (
      <div className="container-fluid tickets-list-container">
        <h2>Ticket</h2>
        <div className="ticket-table">
          {this.props.tickets.map(ticket =>
              <ListItem key={ticket.id} ticket={ticket} />
          )}
        </div>
      </div>
    );
  }
}

export default List;