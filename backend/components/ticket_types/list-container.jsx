import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import List from './list.jsx';
import Store from '../../stores/ticket-type-store.jsx';

class ListContainer extends React.Component {

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="tickets-panel">
        <List tickets={this.props.ticket} />
      </div>
    );
  }
}

ReactMixin(ListContainer.prototype, ReactI18n);

export default ListContainer;