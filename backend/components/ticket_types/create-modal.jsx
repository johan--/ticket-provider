import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import TicketTypeAction from '../../actions/ticket-type-actions.jsx';
import AlertMessages from '../shared/alert-messages.jsx';
import Store from '../../stores/ticket-type-store.jsx';
import emitter from '../../emitter.jsx';

class CreateModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ticket_type: {
        event_id: props.event_id,
        name: '',
        current_price: 0,
        description: ''
      }
    };

    this.showModalSubscription = emitter.addListener('showCreateTicketTypeModal', this.showModal.bind(this));
    this.hideModelSubscription = emitter.addListener('hideCreateTicketTypeModal', this.hideModal.bind(this));
  }

  componentDidMount() {
    this.$modal = $('.modal');
  }

  componentWillUnmount() {
    this.showModalSubscription.remove();
    this.hideModelSubscription.remove();
  }

  showModal() {
    this.$modal.modal('show');
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

  handleNameChange(e) {
    let updateState = this.state;
    updateState.ticket_type.name = e.target.value;
    this.setState(updateState);
  }

  handlePriceChange(e) {
    let updateState = this.state;
    updateState.ticket_type.current_price = e.target.value;
    this.setState(updateState);
  }

  handleDescChange(e) {
    let updateState = this.state;
    updateState.ticket_type.description = e.target.value;
    this.setState(updateState);
  }

  handleSubmit(e) {
    e.preventDefault();
    TicketTypeAction.add(this.state.ticket_type);
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="modal fade is-create-modal"
           tabIndex="-1"
           role="dialog"
           aria-labelledby="title"
           aria-hidden="true"
           onClick={this.hideModal.bind(this)}>
        <div className="modal-internal-wrapper">
          <div className="modal-dialog modal-small-content" role="document">
            <div className="modal-content" onClick={this.preventChildModalHide}>
              <div className="modal-header">
                <h4 className="modal-title" id="title">
                  {t('backend.ticket_types.headers.add_ticket')}
                </h4>
              </div>
              <div className="modal-body">
                <AlertMessages event="error" alertType="danger" />
                <form className="form-horizontal">
                  <fieldset>
                    <div className="form-group">
                      <label htmlFor={t('backend.ticket_types.name')}>
                        {t('backend.ticket_types.name')}
                      </label>
                      <input
                        onChange={this.handleNameChange.bind(this)}
                        name={t('backend.ticket_types.name')}
                        className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor={t('backend.ticket_types.price')}>
                        {t('backend.ticket_types.price')}
                      </label>
                      <input
                        onChange={this.handlePriceChange.bind(this)}
                        name={t('backend.ticket_types.price')}
                        type="number"
                        className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor={t('backend.ticket_types.description')}>
                        {t('backend.ticket_types.description')}
                      </label>
                      <textarea
                        onChange={this.handleDescChange.bind(this)}
                        name={t('backend.ticket_types.description')}
                        className="form-control"/>
                    </div>
                  </fieldset>
                  <button
                    onClick={this.handleSubmit.bind(this)}
                    type="submit"
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

ReactMixin(CreateModal.prototype, ReactI18n);

export default CreateModal;