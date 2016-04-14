import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import Store from '../../stores/ticket-type-store.jsx';
import TicketStore from '../../stores/ticket-store.jsx';
import AlertMessages from '../shared/alert-messages.jsx';
import TicketTypeAction from '../../actions/ticket-type-actions.jsx';
import ListContainer from './list-container.jsx';
import AddTicketTypeModal from '../ticket_types/add-ticket-modal.jsx';
import UpdateTicketModal from '../ticket_types/update-ticket-modal.jsx';
import emitter from '../../emitter.jsx';
import moment from 'moment';
import _ from 'underscore';
import $ from 'jquery';

class EditForm extends React.Component {

  constructor(props) {
    super();
    this.store = Store.getAll({ data: $.param({ activity_id: props.id}), reset: true });
    this.activity_id = props.id;
    this.updateSubscription = emitter.addListener('updateTicketList', this.updateTicketList.bind(this));
  }

  componentDidMount() {
    this.store.on('reset', function() {
      this.forceUpdate();
      if(this.store.models.length == 0){
        Backbone.history.navigate(`/app/activities/${this.activity_id}`, true);
      }
      this.setState(this.store.models[0]);
      TicketStore.set(this.store.models[0].get('tickets'));
    }, this);
  }

  componentWillUnmount() {
    this.store.off(null, null, this);
    this.updateSubscription.remove();
  }

  handleCurrentPriceChange(e) {
    let updateState = this.state;
    updateState.attributes.current_price = e.target.value;
    this.setState(updateState);
  }

  handleTicketTypeDescriptionChange(e) {
    let updateState = this.state;
    updateState.attributes.description = e.target.value;
    this.setState(updateState);
  }

  handleTicketTypeChange(e) {
    let updateState = this.store.get(e.target.value);
    this.setState(updateState);
  }

  showAddTicketModal(e) {
    e.preventDefault();
    emitter.emit('showCreateTicketModal', this.state.attributes);
  }

  handleSubmit(e) {
    e.preventDefault();
    TicketTypeAction.edit(_.pick(this.state.attributes, 'id', 'activity_id', 'current_price', 'description'));
  }

  updateTicketList() {
    this.store = Store.getAll({ data: $.param({ activity_id: this.props.id}), reset: true });
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="ticket-type-form-container">
        <AddTicketTypeModal ticket_type_id={this.state ? this.state.attributes.id : ''} usage_type={this.state ? this.state.attributes.usage_type : ''}/>
        <UpdateTicketModal usage_type={this.state ? this.state.attributes.usage_type : ''} />
        <select className="ticket-types-name"
          value={this.state ? this.state.attributes.id : ''}
          onChange={this.handleTicketTypeChange.bind(this)}>
          {this.store.map(ticket_type =>
              <option key={ticket_type.id}
                      value={ticket_type.id} >
                {ticket_type.get('name')}
              </option>
          )}
        </select>
        <AlertMessages event="success" alertType="success" />
        <div className="form-group">
          <label>{t('backend.ticket_types.price')}</label>
          <input
            value={this.state ? this.state.attributes.current_price : ''}
            name='current_price'
            className="form-control"
            onChange={this.handleCurrentPriceChange.bind(this)}
            />
        </div>
        <div className="form-group">
          <label>{t('backend.ticket_types.description')}</label>
          <textarea
            value={this.state ? this.state.attributes.description : ''}
            name='description'
            className="form-control"
            onChange={this.handleTicketTypeDescriptionChange.bind(this)}
            />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleSubmit.bind(this)}>{t('backend.ticket_types.save_changes')}</button>
        <div className="form-group">
          <label>{t('backend.tickets.available')}</label>
          <h4>{this.state ? this.state.attributes.available_tickets : t('backend.ticket_types.na')} / {this.state ? this.state.attributes.all_tickets : t('backend.ticket_types.na')}</h4>
        </div>
        <ListContainer ticket={this.state ? this.state.attributes.tickets : []}/>
        <div className="ticket-types-container">
          <a onClick={this.showAddTicketModal.bind(this)} className="btn btn-primary">
            {t('backend.tickets.new_ticket')}
          </a>
        </div>
      </div>
    );
  }
}

ReactMixin(EditForm.prototype, ReactI18n);

export default EditForm;