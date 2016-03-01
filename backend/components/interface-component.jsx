import React from 'react';
import Navbar from './navbar.jsx';
import EventListContainer from './events/list-container.jsx';
import EventCreateContainer from './events/create-container.jsx';
import EventEditContainer from './events/edit-container.jsx';

class InterfaceComponent extends React.Component {

  componentWillMount() {
    this.callback = (function() {
      this.forceUpdate();
    }).bind(this);

    this.props.router.on('route', this.callback);
  }

  componentWillUnmount() {
    this.props.router.off('route', this.callback);
  }

  render() {
    /*
     * TODO: Implement routes according to this example.
     *
     * if (this.props.router.current === 'events') {
     *   return (<Event />);
     * }
     *
     */

    if (this.props.router.current === 'events') {
      return (
        <div>
          <Navbar />
          <EventListContainer />
        </div>
      );
    }

    if (this.props.router.current === 'events/new') {
      return (
        <div>
          <Navbar />
          <EventCreateContainer />
        </div>
      );
    }

    if (this.props.router.current === 'events/edit') {
      return (
        <div>
          <Navbar />
          <EventEditContainer id={this.props.router.params._id} />
        </div>
      );
    }
    return (<div />);
  }
}

export default InterfaceComponent;