import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import emitter from '../../emitter.jsx';

class ListItem extends React.Component {

  handleClick(e) {
    e.preventDefault();
    Backbone.history.navigate($(e.currentTarget).attr('href'), true);
  }

  handleDelete(e) {
    e.preventDefault();
    emitter.emit('showDeleteModal', this.props.activity);
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="activity-item col-md-4">
        <a href={`/app/activities/${this.props.activity.id}`} onClick={this.handleClick}>
          <div className="activity-image">
            <img src={this.props.activity.get('cover_photo_url')} />
            <p>{this.props.activity.get('name')}</p>
          </div>
          <div className="activity-info">
            <div className="activity-info-item activity-date">
              {this.props.activity.get('date')}
            </div>
            <div className="activity-info-item activity-tickets">
              {(this.props.activity.attributes.available_tickets/this.props.activity.attributes.all_tickets)*100}%
              <small>{t('backend.activities.available')}</small>
            </div>
          </div>
        </a>

        <div className="activity-item-action">
          <a href={`/app/activities/${this.props.activity.id}/edit`} className="action-container"  onClick={this.handleClick}>
            <i className="icon icon-pencil" />
          </a>
          <a className="action-container" href="#" onClick={this.handleDelete.bind(this)}>
            <i className="icon icon-close" />
          </a>
        </div>
      </div>
    );
  }
}

ReactMixin(ListItem.prototype, ReactI18n);

export default ListItem;