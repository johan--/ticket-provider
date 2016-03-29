import React from 'react';
import AlertMessages from '../shared/alert-messages.jsx';
import ListItem from './list-item.jsx';

class List extends React.Component {

  render() {
    return (
      <div className="container-fluid activities-list-container">
        <AlertMessages event="success" alertType="success" />
        {this.props.store.map(activity =>
          <ListItem key={activity.id} activity={activity} />
        )}
      </div>
    );
  }
}

export default List;