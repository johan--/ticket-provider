import React from 'react';
import ListItem from './list-item.jsx';

class List extends React.Component {

  render() {
    return (
      <div className="container-fluid events-list-container">
        {this.props.store.map(event =>
          <ListItem key={event.id} event={event} />
        )}
      </div>
    );
  }
}

export default List;