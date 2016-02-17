import React from 'react';
import Navbar from './navbar.jsx'

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
      return (<Navbar />);
    }
    return (<div />);
  }
}

export default InterfaceComponent;