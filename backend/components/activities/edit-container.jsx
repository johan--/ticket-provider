import React from 'react';
import EditForm from './edit-form.jsx';
import Store from '../../stores/activity-store.jsx';
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
      <div className="activity-panel">
        <header>>> {this.state.get('name')}</header>
        <EditForm activity={this.state}/>
      </div>
    );
  }
}

export default EditContainer;