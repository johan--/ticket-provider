import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';

class Action extends React.Component {

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="events-action-container">
        <a className="btn btn-primary create-button">{t('backend.events.create_new_event')}</a>
      </div>
    );
  }
}

ReactMixin(Action.prototype, ReactI18n);

export default Action;