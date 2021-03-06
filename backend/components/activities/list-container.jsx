import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import DeleteModal from './delete-modal.jsx';
import Action from './action.jsx';
import Search from './search.jsx';
import List from './list.jsx';
import Store from '../../stores/activity-store.jsx';

class ListContainer extends React.Component {

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
      <div className="activity-panel">
        <header>>> {t('backend.activities.headers.activity')}</header>
        <div className="activities-actions">
          <Search />
          <Action />
        </div>
        <List store={this.state} />
        <DeleteModal error="errorDeleteActivity" alertType="danger" />
      </div>
    );
  }
}

ReactMixin(ListContainer.prototype, ReactI18n);

export default ListContainer;