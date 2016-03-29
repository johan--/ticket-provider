import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import List from './list.jsx';
import Store from '../../stores/ticket-type-store.jsx';

class ListContainer extends React.Component {

  constructor(props) {
    super();
    console.log(props);
    this.state = {
      tickets: props.ticket
    };
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
      <div className="tickets-panel">
        <header>>> {t('backend.ticket_types.headers.ticket')}</header>
        <List store={this.state} />
      </div>
    );
  }
}

ReactMixin(ListContainer.prototype, ReactI18n);

export default ListContainer;