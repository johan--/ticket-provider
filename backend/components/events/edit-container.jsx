import React from 'react';
import EditForm from './edit-form.jsx';
import Store from '../../stores/event-store.jsx';
import $ from 'jquery';

class EditContainer extends React.Component {
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

  render() {
    return (
      <div className="event-panel">
        <header>>> {this.state.get('name')}</header>
        <EditForm event={this.state}/>
      </div>
    );
  }
}

export default EditContainer;