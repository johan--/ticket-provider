import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import TicketAction from '../../actions/ticket-actions.jsx';
import AlertMessages from '../shared/alert-messages.jsx';
import AppConst from '../../app-constant.jsx'
import Store from '../../stores/ticket-store.jsx';
import emitter from '../../emitter.jsx';

class UpdateTicketModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ticket: {
        quantity: 0,
        price: 0
      },
      ticket_type_id: props.ticket_type_id,
      usage_type: props.usage_type
    };

    this.showModalSubscription = emitter.addListener('showUpdateTicketModal', this.showModal.bind(this));
    this.hideModelSubscription = emitter.addListener('hideUpdateTicketModal', this.hideModal.bind(this));
  }

  componentDidMount() {
    this.$modal = $('.update-modal');
  }

  componentWillUnmount() {
    this.showModalSubscription.remove();
    this.hideModelSubscription.remove();
  }

  showModal(ticket) {
    this.setState(ticket);
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

  handleTicketStateChange(e) {
    let updateState = this.state;
    updateState.ticket.state = e.target.value;
    this.setState(updateState);
  }

  handleUsageQuantityChange(e) {
    let updateState = this.state;
    updateState.ticket.usage_quantity = e.target.value;
    this.setState(updateState);
  }

  handleSubmit(e) {
    e.preventDefault();
    TicketAction.edit(this.state);
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="update-modal modal fade is-create-modal"
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
                  {t('backend.tickets.update_state')}
                </h4>
              </div>
              <div className="modal-body">
                <AlertMessages event="error" alertType="danger" />
                <form className="form-horizontal">
                  <div className="form-group">
                    <label htmlFor={t('backend.tickets.state')}>
                      {t('backend.tickets.state')}
                    </label>
                    <select className="ticket-types-name"
                            value={this.state.ticket.state}
                            onChange={this.handleTicketStateChange.bind(this)} >
                      {AppConst.ticket_state.map(state =>
                          <option key={Math.random()}
                                  value={state.value} >
                            {state.key}
                          </option>
                      )}
                    </select>
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

ReactMixin(UpdateTicketModal.prototype, ReactI18n);

export default UpdateTicketModal;