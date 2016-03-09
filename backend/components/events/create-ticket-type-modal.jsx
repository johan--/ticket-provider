import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';

class CreateTicketTypeModal extends React.Component {

  componentDidMount() {
    this.$modal = $('.modal');
  }

  handleCancel() {
    this.$modal.modal('hide');
  }

  hideModal() {
    this.$modal.modal('hide');
  }

  // Prevent child modal from trigger hideModal on it's click event.
  preventChildModalHide(e) {
    e.stopPropagation();
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="modal fade is-create-modal"
           tabIndex="-1"
           role="dialog"
           aria-labelledby="title"
           aria-hidden="true"
           onClick={this.hideModal.bind(this)} >
        <div className="modal-internal-wrapper">
          <div className="modal-dialog modal-small-content" role="document">
            <div className="modal-content" onClick={this.preventChildModalHide}>
              <div className="modal-header">
                <h4 className="modal-title" id="title">
                  {t('backend.ticket_types.headers.add_ticket')}
                </h4>
              </div>
              <div className="modal-body">
                <form className="form-horizontal">
                  <fieldset>
                    <div className="form-group">
                      <label htmlFor={t('backend.ticket_types.name')}>
                        {t('backend.ticket_types.name')}
                      </label>
                      <input name={t('backend.ticket_types.name')} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor={t('backend.ticket_types.price')}>
                        {t('backend.ticket_types.price')}
                      </label>
                      <input name={t('backend.ticket_types.price')} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor={t('backend.ticket_types.description')}>
                        {t('backend.ticket_types.description')}
                      </label>
                      <textarea
                        name={t('backend.ticket_types.description')}
                        className="form-control"/>
                    </div>
                  </fieldset>
                  <button type="button"
                          className="btn btn-primary">
                    {t('backend.ticket_types.save_changes')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactMixin(CreateTicketTypeModal.prototype, ReactI18n);

export default CreateTicketTypeModal;