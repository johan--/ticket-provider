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
    emitter.emit('showDeleteModal', this.props.event);
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="ticket-list">
        <div className="ticket-name ticket-cell">
          {this.props.ticket.id}
        </div>
        <div className="ticket-seat ticket-cell">
          {this.props.ticket.row}-{this.props.ticket.column}
        </div>
        <div className="ticket-state ticket-cell">
          {this.props.ticket.state}
        </div>
        <div className="ticket-action ticket-cell">
          <a href={`/app/events/${this.props.ticket.id}/edit`} className="action-container"  onClick={this.handleClick}>
            Update
          </a>
        </div>
        <div className="ticket-action ticket-cell">
          <a className="action-container" href="#" onClick={this.handleDelete.bind(this)}>
            Delete
          </a>
        </div>
      </div>
    );
  }
}

ReactMixin(ListItem.prototype, ReactI18n);

export default ListItem;