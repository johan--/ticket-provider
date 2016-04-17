import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import AlertMessages from './alert-messages.jsx';

class ConfirmModal extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.$modal = $('.modal');
  }

  // To be override.
  handleConfirm() {}

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
      <div className="modal fade"
           tabIndex="-1"
           role="dialog"
           aria-labelledby="title"
           aria-hidden="true"
           onClick={this.hideModal.bind(this)} >
        <div className="modal-internal-wrapper">
          <div className="modal-dialog modal-small-content" role="document">
            <div className="modal-content" onClick={this.preventChildModalHide}>
              <div className="modal-header">
                <h4 className="modal-title" id="title">{this.state.title}</h4>
              </div>
              <div className="modal-body">
                <AlertMessages event={this.props.error} alertType={this.props.alertType} />
                <p>{this.state.description}</p>

                <button type="button"
                        onClick={this.handleConfirm.bind(this)}
                        className="btn btn-danger">
                  {t('backend.modal.confirm.delete')}
                </button>
                <button type="button"
                        onClick={this.handleCancel.bind(this)}
                        className="btn btn-info">
                  {t('backend.modal.confirm.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactMixin(ConfirmModal.prototype, ReactI18n);

export default ConfirmModal;