import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';

class ListItem extends React.Component {

  handleClick(e) {
    e.preventDefault();
    Backbone.history.navigate($(e.currentTarget).attr('href'), true);
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <a href={`/app/events/${this.props.event.id}/edit`} onClick={this.handleClick} className="event-item col-md-4">
        <div className="event-image">
          <img src={this.props.event.get('cover_photo_url')} />
          <p>{this.props.event.get('name')}</p>
        </div>
        <div className="event-info">
          <div className="event-info-item event-date">
            {this.props.event.get('date')}
          </div>
          <div className="event-info-item event-tickets">
            53%
            <small>{t('backend.events.available')}</small>
          </div>
        </div>
      </a>
    );
  }
}

ReactMixin(ListItem.prototype, ReactI18n);

export default ListItem;