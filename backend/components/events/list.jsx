import React from 'react';
import ListItem from './list-item.jsx';

class List extends React.Component {

  render() {
    return (
      <div className="event-list-container">
        {this.props.store.map(event =>
          <div key={event.id} className="col-md-4">
            <ListItem event={event} />
          </div>
        )}
      </div>
    );
  }
}

export default List;