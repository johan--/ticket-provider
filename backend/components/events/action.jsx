import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import $ from 'jquery';
import Backbone from 'backbone';

class Action extends React.Component {

  handleClick(e) {
    e.preventDefault();
    Backbone.history.navigate($(e.currentTarget).attr('href'), true);
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="events-action-container">
        <a className="btn btn-primary create-button" onClick={this.handleClick} href='/app/events/new'>{t('backend.events.create_new_event')}</a>
      </div>
    );
  }
}

ReactMixin(Action.prototype, ReactI18n);

export default Action;