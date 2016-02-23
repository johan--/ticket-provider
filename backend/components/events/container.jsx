import React from 'react';
import Action from './action.jsx';
import Search from './search.jsx';
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
      <div className="event-panel">
        <header>>> event</header>
        <div className="events-actions">
          <Search />
          <Action />
        </div>
        <List store={Store} />
      </div>
    );
  }
}

export default Container;