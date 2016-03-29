import React from 'react';
import Navbar from './navbar.jsx';
import ActivityListContainer from './activities/list-container.jsx';
import ActivityCreateContainer from './activities/create-container.jsx';
import ActivityShowContainer from './activities/show-container.jsx';
import ActivityEditContainer from './activities/edit-container.jsx';
import TicketTypeEditContainer from './ticket_types/edit-container.jsx';
import OrganizerSettingContainer from './organizers/setting-container.jsx';
import AccountSettingContainer from './accounts/setting-container.jsx';

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
     * if (this.props.router.current === 'activities') {
     *   return (<Activity />);
     * }
     *
     */

    if (this.props.router.current === 'activities') {
      return (
        <div>
          <Navbar />
          <ActivityListContainer />
        </div>
      );
    }

    if (this.props.router.current === 'activities/new') {
      return (
        <div>
          <Navbar />
          <ActivityCreateContainer />
        </div>
      );
    }

    if (this.props.router.current === 'activities/show') {
      return (
        <div>
          <Navbar />
          <ActivityShowContainer id={this.props.router.params._id} />
        </div>
      );
    }

    if (this.props.router.current === 'activities/edit') {
      return (
        <div>
          <Navbar />
          <ActivityEditContainer id={this.props.router.params._id} />
        </div>
      );
    }

    if (this.props.router.current === 'events/ticket_types') {
      return (
        <div>
          <Navbar />
          <TicketTypeEditContainer id={this.props.router.params._id} />
        </div>
      );
    }

    if(this.props.router.current === 'organizers/settings') {
      return (
        <div>
          <Navbar />
          <OrganizerSettingContainer />
          <AccountSettingContainer />
        </div>
      );
    }
    return (<div />);
  }
}

export default InterfaceComponent;