import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';

class ConfirmModal extends React.Component {

  constructor(props) {
    super();
    this.state = props;
  }

  componentDidMount() {
    this.$modal = $('.modal');
    this.$modal.on('click', () => {
      this.$modal.modal('hide');
    });

    $('.modal .modal-content').on('click', function(e) { e.stopPropagation(); });
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="title" aria-hidden="true">
        <div className="modal-internal-wrapper">
          <div className="modal-dialog modal-small-content" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="title">{this.state.title}</h4>
              </div>
              <div className="modal-body">
                <p>{this.state.description} {this.state.model ? this.state.model.get('name') : ''}</p>

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