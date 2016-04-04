import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import EditForm from './edit-form.jsx';
import $ from 'jquery';

class EditContainer extends React.Component {

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="ticket-type-panel">
        <header>>> {t('backend.ticket_types.headers.edit_ticket')}</header>
        <EditForm id={this.props.id} />
      </div>
    );
  }
}

ReactMixin(EditContainer.prototype, ReactI18n);

export default EditContainer;