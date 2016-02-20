import React from 'react';
import Navbar from '../navbar.jsx';
import List from './list.jsx';
import Store from '../../stores/event-store.jsx';

class Container extends React.Component {

  constructor() {
    super();
    this.state = Store.getAll();
  }

  componentDidMount() {
    this.state.on('add remove reset change', function() {
      this.forceUpdate();
    }, this);
  }

  componentWillUnmount() {
    this.state.off(null, null, this);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="events-container">
          <List store={Store}/>
        </div>
      </div>
    );
  }
}

export default Container;