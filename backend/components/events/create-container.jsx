import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import CreateForm from './create-form.jsx';
import Store from '../../stores/event-store.jsx';

class CreateContainer extends React.Component {

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
        <header>>> {t('backend.events.headers.new_event')}</header>
        <CreateForm store={this.state}/>
      </div>
    );
  }
}

ReactMixin(CreateContainer.prototype, ReactI18n);

export default CreateContainer;