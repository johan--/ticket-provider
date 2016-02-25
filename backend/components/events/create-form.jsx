import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import DatePicker from 'react-datetime';
import moment from 'moment';
import EventAction from '../../actions/event-actions.jsx';

class CreateForm extends React.Component {

  constructor() {
    super();
    this.state = { name: '', description: '', date: moment() };
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
      description: this.state.description,
      date: this.state.date
    });
  }

  handleDescChange(e) {
    this.setState({
      name: this.state.name,
      description: e.target.value,
      date: this.state.date
    });
  }

  handleDateChange(date) {
    this.setState({
      name: this.state.name,
      description: this.state.description,
      date: date._d
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    EventAction.add(this.state);
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="event-form-container">
        <form className="form-horizontal" ref="eventForm">
          <fieldset>
            <div className="form-group">
              <label htmlFor="name">{t('backend.events.name')}</label>
              <input
                name={t('backend.events.name')}
                className="form-control"
                onChange={this.handleNameChange.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="description">{t('backend.events.description')}</label>
              <textarea
                name={t('backend.events.description')}
                className="form-control"
                onChange={this.handleDescChange.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="date">{t('backend.events.date')}</label>
              <DatePicker onChange={this.handleDateChange.bind(this)}/>
            </div>
          </fieldset>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit.bind(this)}>{t('backend.events.create_event')}</button>
        </form>
      </div>
    );
  }
}

ReactMixin(CreateForm.prototype, ReactI18n);

export default CreateForm;