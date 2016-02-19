import React from 'react';
import Navbar from '../navbar.jsx';
import ListItem from './list-item.jsx';

class Container extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <div className="events-container">
          <ListItem />
          <ListItem />
          <ListItem />
        </div>
      </div>
    );
  }
}

export default Container;