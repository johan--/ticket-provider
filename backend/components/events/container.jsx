import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
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
    let t = this.getIntlMessage;
    return (
      <div className="event-panel">
        <header>>> {t('backend.events.header')}</header>
        <div className="events-actions">
          <Search />
          <Action />
        </div>
        <List store={Store} />
      </div>
    );
  }
}

ReactMixin(Container.prototype, ReactI18n);

export default Container;