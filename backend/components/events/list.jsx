import React from 'react';
import ListItem from './list-item.jsx';

class List extends React.Component {

  render() {
    return (
      <div className="event-list-container">
        <div className="col-md-4">
          <ListItem />
        </div>
        <div className="col-md-4">
          <ListItem />
        </div>
        <div className="col-md-4">
          <ListItem />
        </div>
        <div className="col-md-4">
          <ListItem />
        </div>
        <div className="col-md-4">
          <ListItem />
        </div>
        <div className="col-md-4">
          <ListItem />
        </div>
      </div>
    );
  }
}

export default List;