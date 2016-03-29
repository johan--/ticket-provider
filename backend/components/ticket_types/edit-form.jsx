import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import Store from '../../stores/ticket-type-store.jsx';
import AlertMessages from '../shared/alert-messages.jsx';
import TicketTypeAction from '../../actions/ticket-type-actions.jsx';
//import ListContainer from './list-container.jsx';
import moment from 'moment';
import _ from 'underscore';
import $ from 'jquery';

class EditForm extends React.Component {

  constructor(props) {
    super();
    this.store = Store.getAll({ data: $.param({ event_id: props.id}), reset: true });
  }

  componentDidMount() {
    this.store.on('reset', function() {
      this.forceUpdate();
      this.setState(this.store.models[0]);
    }, this);
  }

  componentWillUnmount() {
    this.store.off(null, null, this);
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

  handleSubmit(e) {
    e.preventDefault();
    TicketTypeAction.edit(_.pick(this.state, 'id', 'price', 'description'));
  }

  render() {
    let t = this.getIntlMessage;
    if(this.state) console.log(this.state);
    return (
      <div className="ticket-type-form-container">
        <select value={this.state ? this.state.attributes.id : ''}
          onChange={this.handleTicketTypeChange.bind(this)}>
          {this.store.map(ticket_type =>
              <option key={ticket_type.id}
                      value={ticket_type.id} >
                {ticket_type.get('name')}
              </option>
          )}
        </select>
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
            name='current_price'
            className="form-control"
            onChange={this.handleTicketTypeDescriptionChange.bind(this)}
            />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleSubmit.bind(this)}>{t('backend.accounts.save_changes')}</button>
        <div className="form-group">
          <label>Available</label>
          <label>500</label>
        </div>
        <div className="form-group">
          <label>Available</label>
          <label>500</label>
        </div>
      </div>
    );
  }
}

ReactMixin(EditForm.prototype, ReactI18n);

export default EditForm;