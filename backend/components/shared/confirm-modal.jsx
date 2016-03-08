import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';

class ConfirmModal extends React.Component {

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="title" aria-hidden="true">
        <div className="modal-internal-wrapper">
          <div className="modal-dialog modal-small-content" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="title">{this.props.title}</h4>
              </div>
              <div className="modal-body">
                <p>{this.props.description}</p>

                <button type="button" className="btn btn-danger">{t('backend.modal.confirm.delete')}</button>
                <button type="button" className="btn btn-info">{t('backend.modal.confirm.cancel')}</button>
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