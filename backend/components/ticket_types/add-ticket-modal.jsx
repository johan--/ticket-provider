import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import TicketAction from '../../actions/ticket-actions.jsx';
import AlertMessages from '../shared/alert-messages.jsx';
import Store from '../../stores/ticket-store.jsx';
import emitter from '../../emitter.jsx';

class AddTicketModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ticket: { quantity: 0,
                price: 0,
                usage_quantity: 0},
      ticket_type_id: props.ticket_type_id,
      usage_type: props.usage_type
    };

    this.showModalSubscription = emitter.addListener('showCreateTicketModal', this.showModal.bind(this));
    this.hideModelSubscription = emitter.addListener('hideCreateTicketModal', this.hideModal.bind(this));
  }

  componentDidMount() {
    this.$modal = $('.add-modal');
  }

  componentWillUnmount() {
    this.showModalSubscription.remove();
    this.hideModelSubscription.remove();
  }

  showModal(ticket) {
    this.state.ticket_type_id = ticket.id;
    this.state.ticket.price = ticket.current_price;
    this.$modal.modal('show');
    if(this.state.usage_type == 'uncountable') {
      $('.usage_quantity').hide();
    }
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

  handleQuantityChange(e) {
    let updateState = this.state;
    updateState.ticket.quantity = e.target.value;
    this.setState(updateState);
  }

  handleUsageQuantityChange(e) {
    let updateState = this.state;
    updateState.ticket.usage_quantity = e.target.value;
    this.setState(updateState);
  }

  handleSubmit(e) {
    e.preventDefault();
    TicketAction.add(this.state);
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="add-modal modal fade is-create-modal"
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
                  <div className="form-group">
                    <label htmlFor={t('backend.tickets.quantity')}>
                      {t('backend.tickets.quantity')}
                    </label>
                    <input
                      onChange={this.handleQuantityChange.bind(this)}
                      name="ticket_quantity"
                      value={this.state.quantity}
                      className="form-control" />
                  </div>
                  <div className="form-group usage_quantity">
                    <label htmlFor={t('backend.tickets.usage_quantity')}>
                      {t('backend.tickets.usage_quantity')}
                    </label>
                    <input
                      onChange={this.handleUsageQuantityChange.bind(this)}
                      name="ticket_quantity"
                      value={this.state.usage_quantity}
                      className="form-control" />
                  </div>
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

ReactMixin(AddTicketModal.prototype, ReactI18n);

export default AddTicketModal;