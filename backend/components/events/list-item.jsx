import React from 'react';

class ListItem extends React.Component {

  render() {
    return (
      <div className="event-item col-md-4">
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
            <small>available</small>
          </div>
        </div>
      </div>
    );
  }
}

export default ListItem;