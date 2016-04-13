import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import CreateTicketTypeModal from '../ticket_types/create-modal.jsx';
import Store from '../../stores/activity-store.jsx';
import TicketTypeStore from '../../stores/ticket-type-store.jsx';
import AlertMessages from '../shared/alert-messages.jsx';
import emitter from '../../emitter.jsx';

class ShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getModel(props.id);
    this.store = TicketTypeStore.getAll({ data: $.param({ activity_id: props.id}), reset: true });
    this.disableEditTicket = true;
    this.enableTicketEdit = emitter.addListener('enableEditTicket', this.enableEditTicket.bind(this));
  }

  componentDidMount() {
    let _this = this;
    this.state.on('add remove reset change', function() {
      this.forceUpdate();
    }, this);
    this.store.on('reset', function() {
      if (_this.store.models.length > 0) {
        _this.disableEditTicket = false;
        this.forceUpdate();
      }
    }, this);
    this.$modal = $('.modal');
  }

  componentWillUnmount() {
    this.state.off(null, null, this);
    this.store.off(null, null, this);
    this.enableTicketEdit.remove();
  }

  handleClick(e) {
    e.preventDefault();
    console.log(e);
    Backbone.history.navigate($(e.currentTarget).attr('href'), true);

  }

  showCreateTicketTypeModal(e) {
    e.preventDefault();
    emitter.emit('showCreateTicketTypeModal', this.props.activity);
  }

  enableEditTicket() {
    this.disableEditTicket = false;
    this.forceUpdate();
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div>
        <CreateTicketTypeModal activity_id={this.state.get('id')}/>
        <AlertMessages event="no-ticket" alertType="danger" />
        <div className="activity-panel is-show">
          <header>>> {this.state.get('name')}</header>
          <div className="activity-show-container">
            <div className="activity-image">
              <img src={this.state.get('cover_photo_url')} />
            </div>
            <div className="activity-description">
              <label htmlFor="description">{t('backend.activities.description')}</label>
              <p>{this.state.get('description')}</p>
              <div className="activity-info">
                <label htmlFor="date">{t('backend.activities.date')}</label>
                <div>{this.state.get('date')}</div>
              </div>
              <div className="activity-info">
                <label htmlFor="id">{t('backend.activities.id')}</label>
                <div>{this.state.get('id')}</div>
              </div>
              <div className="activity-info">
                <label htmlFor="available">{t('backend.activities.available')}</label>
                <div>{this.state.attributes.available_tickets} / {this.state.attributes.all_tickets}</div>
              </div>
              <div className="activity-action">
                <button disabled={this.disableEditTicket} href={`app/activities/${this.state.get('id')}/ticket_types`} onClick={this.handleClick.bind(this)} id="edit-ticket" className="btn btn-primary">
                  {t('backend.tickets.edit_ticket')}
                </button>
                <button onClick={this.showCreateTicketTypeModal.bind(this)} className="btn btn-primary">
                  {t('backend.tickets.new_ticket')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactMixin(ShowContainer.prototype, ReactI18n);

export default ShowContainer;