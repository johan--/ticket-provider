import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import Store from '../../stores/event-store.jsx';

class ShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getModel(props.id);
  }

  componentDidMount() {
    this.state.on('add remove reset change', function() {
      this.forceUpdate();
    }, this);
  }

  componentWillUnmount() {
    this.state.off(null, null, this);
  }

  handleClick(e) {
    e.preventDefault();
    Backbone.history.navigate($(e.currentTarget).attr('href'), true);
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="event-panel is-show">
        <header>>> {this.state.get('name')}</header>
        <div className="event-show-container">
          <div className="event-image">
            <img src={this.state.get('cover_photo_url')} />
          </div>
          <div className="event-description">
            <label htmlFor="description">{t('backend.events.description')}</label>
            <p>{this.state.get('description')}</p>
            <div className="event-info">
              <label htmlFor="date">{t('backend.events.date')}</label>
              <div>{this.state.get('date')}</div>
            </div>
            <div className="event-info">
              <label htmlFor="available">{t('backend.events.available')}</label>
              <div>128/1000</div>
            </div>
            <div className="event-action">
              <a onClick={this.handleClick} className="btn btn-primary">
                {t('backend.tickets.edit_ticket')}
              </a>
              <a onClick={this.handleClick} className="btn btn-primary">
                {t('backend.tickets.new_ticket')}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactMixin(ShowContainer.prototype, ReactI18n);

export default ShowContainer;