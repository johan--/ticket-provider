import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import CreateTicketTypeModal from '../ticket_types/create-modal.jsx';
import Store from '../../stores/activity-store.jsx';
import emitter from '../../emitter.jsx';

class ShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getModel(props.id);
  }

  componentDidMount() {
    this.state.on('add remove reset change', function() {
      this.forceUpdate();
    }, this);
    this.$modal = $('.modal');
  }

  componentWillUnmount() {
    this.state.off(null, null, this);
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

  render() {
    let t = this.getIntlMessage;
    return (
      <div>
        <CreateTicketTypeModal activity_id={this.state.get('id')}/>
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
                <div>128/1000</div>
              </div>
              <div className="activity-action">
                <a href={`app/activities/${this.state.get('id')}/ticket_types`} onClick={this.handleClick} className="btn btn-primary">
                  {t('backend.tickets.edit_ticket')}
                </a>
                <a onClick={this.showCreateTicketTypeModal.bind(this)} className="btn btn-primary">
                  {t('backend.tickets.new_ticket')}
                </a>
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