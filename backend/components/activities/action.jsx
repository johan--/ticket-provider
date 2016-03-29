import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import $ from 'jquery';
import Backbone from '../../backbone.jsx';

class Action extends React.Component {

  handleClick(e) {
    e.preventDefault();
    Backbone.history.navigate($(e.currentTarget).attr('href'), true);
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="activities-action-container">
        <a className="btn btn-primary" onClick={this.handleClick} href='/app/activities/new'>{t('backend.activities.create_new_activity')}</a>
      </div>
    );
  }
}

ReactMixin(Action.prototype, ReactI18n);

export default Action;