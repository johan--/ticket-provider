import React from 'react';

class ListItem extends React.Component {

  render() {
    return (
      <div className="event-item">
        <div className="event-image">
          <img src="http://www.thaiticketmajor.com/concert/images/single-festival-2015/seating.gif" />
          <p>Single Festival 2016</p>
        </div>
        <div className="event-info">
          <div className="event-info-item event-date">
            23 MAY 2016
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