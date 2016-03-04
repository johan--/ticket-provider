import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import Dropzone from 'react-dropzone';
import DatePicker from 'react-datetime';
import AlertMessages from '../shared/alert-messages.jsx';
import moment from 'moment';
import EventAction from '../../actions/event-actions.jsx';
import _ from 'underscore';

class EditForm extends React.Component {

  constructor(props) {
    super();
    let t = this.getIntlMessage;
    this.dropzone_title = t('backend.events.image_upload.dropzone_title');
    this.state = {
      event: props.event.attributes,
      image_class: 'event-cover-photo',
      dropzone_title: ''
    };
  }

  handleImageDelete() {
    let updateState = this.state;
    updateState.event.cover_photo = '';
    this.setState(updateState);
  }

  handleNameChange(e) {
    let updateState = this.state;
    updateState.event.name = e.target.value;
    this.setState(updateState);
  }

  handleDescChange(e) {
    let updateState = this.state;
    updateState.event.description = e.target.value;
    this.setState(updateState);
  }

  handleDateChange(date) {
    let updateState = this.state;
    updateState.event.date = date._d;
    this.setState(updateState);
  }

  handleFileDrop(files) {
    let updateState = this.state;
    updateState.event.cover_photo = files[0];
    updateState.dropzone_title = '';
    this.setState(updateState);
  }

  handleMouseEnter() {
    let updateState = this.state;
    updateState.image_class = 'event-cover-photo blur';
    updateState.dropzone_title = this.dropzone_title;
    this.setState(updateState);
  }

  handleMouseLeave() {
    let updateState = this.state;
    updateState.image_class = 'event-cover-photo';
    updateState.dropzone_title = '';
    this.setState(updateState);
  }

  handleSubmit(e) {
    e.preventDefault();
    EventAction.edit(_.pick(this.state.event, 'id', 'name', 'date', 'description', 'cover_photo'));
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="event-form-container">
        <form className="form-horizontal">
          <AlertMessages alertType="danger" />
          <fieldset>
            <div className="form-group">
              <label htmlFor="name">{t('backend.events.name')}</label>
              <input
                value={this.state.event.name}
                name={t('backend.events.name')}
                className="form-control"
                onChange={this.handleNameChange.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="date">{t('backend.events.date')}</label>
              <DatePicker value={Date.parse(this.state.event.date)} onChange={this.handleDateChange.bind(this)}/>
            </div>
            <div className="form-group image-upload">
              <label htmlFor="cover_photo">{t('backend.events.image')}</label>
              <img className={this.state.image_class}
                   src={this.state.event.cover_photo ? this.state.event.cover_photo.preview : `${this.state.event.cover_photo_url}`} />
              <Dropzone
                onDrop={this.handleFileDrop.bind(this)}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}>
                <div className="dropzone" >{this.state.dropzone_title}</div>
              </Dropzone>
              <button
                type="button"
                onClick={this.handleImageDelete.bind(this)}
                className="btn btn-primary">
                {t('backend.events.image_upload.delete')}
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="description">{t('backend.events.description')}</label>
              <textarea
                value={this.state.event.description}
                name={t('backend.events.description')}
                className="form-control"
                onChange={this.handleDescChange.bind(this)}/>
            </div>
          </fieldset>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit.bind(this)}>{t('backend.events.save_changes')}</button>
        </form>
      </div>
    );
  }
}

ReactMixin(EditForm.prototype, ReactI18n);

export default EditForm;