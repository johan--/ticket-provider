import React from 'react';
import AlertMessages from '../shared/alert-messages.jsx';
import ListItem from './list-item.jsx';

class List extends React.Component {

  render() {
    return (
      <div className="container-fluid events-list-container">
        <AlertMessages event="success" alertType="success" />
        {this.props.store.map(event =>
          <ListItem key={event.id} event={event} />
        )}
      </div>
    );
  }
}

export default List;