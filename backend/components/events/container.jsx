import React from 'react';
import Navbar from '../navbar.jsx';
import List from './list.jsx';

class Container extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <div className="events-container">
          <List />
        </div>
      </div>
    );
  }
}

export default Container;