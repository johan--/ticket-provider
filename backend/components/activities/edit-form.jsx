import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import Dropzone from 'react-dropzone';
import DatePicker from 'react-datetime';
import AlertMessages from '../shared/alert-messages.jsx';
import moment from 'moment';
import ActivityAction from '../../actions/activity-actions.jsx';
import _ from 'underscore';

class EditForm extends React.Component {

  constructor(props) {
    super();
    let t = this.getIntlMessage;
    this.dropzone_title = t('backend.activities.image_upload.dropzone_title');
    this.state = {
      activity: props.activity.attributes,
      image_class: 'activity-cover-photo',
      dropzone_title: ''
    };
  }

  handleImageDelete() {
    let updateState = this.state;
    updateState.activity.cover_photo = '';
    this.setState(updateState);
  }

  handleNameChange(e) {
    let updateState = this.state;
    updateState.activity.name = e.target.value;
    this.setState(updateState);
  }

  handleDescChange(e) {
    let updateState = this.state;
    updateState.activity.description = e.target.value;
    this.setState(updateState);
  }

  handleDateChange(date) {
    let updateState = this.state;
    updateState.activity.date = date._d;
    this.setState(updateState);
  }

  handleFileDrop(files) {
    let updateState = this.state;
    updateState.activity.cover_photo = files[0];
    updateState.dropzone_title = '';
    this.setState(updateState);
  }

  handleMouseEnter() {
    let updateState = this.state;
    updateState.image_class = 'activity-cover-photo blur';
    updateState.dropzone_title = this.dropzone_title;
    this.setState(updateState);
  }

  handleMouseLeave() {
    let updateState = this.state;
    updateState.image_class = 'activity-cover-photo';
    updateState.dropzone_title = '';
    this.setState(updateState);
  }

  handleSubmit(e) {
    e.preventDefault();
    ActivityAction.edit(_.pick(this.state.activity, 'id', 'name', 'date', 'description', 'cover_photo'));
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="activity-form-container">
        <form className="form-horizontal">
          <AlertMessages event="error" alertType="danger"/>
          <fieldset>
            <div className="form-group">
              <label htmlFor="name">{t('backend.activities.name')}</label>
              <input
                value={this.state.activity.name}
                name={t('backend.activities.name')}
                className="form-control"
                onChange={this.handleNameChange.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="date">{t('backend.activities.date')}</label>
              <DatePicker value={Date.parse(this.state.activity.date)} onChange={this.handleDateChange.bind(this)}/>
            </div>
            <div className="form-group image-upload">
              <label htmlFor="cover_photo">{t('backend.activities.image')}</label>
              <img className={this.state.image_class}
                   src={this.state.activity.cover_photo ? this.state.activity.cover_photo.preview : `${this.state.activity.cover_photo_url}`} />
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
                {t('backend.activities.image_upload.delete')}
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="description">{t('backend.activities.description')}</label>
              <textarea
                value={this.state.activity.description}
                name={t('backend.activities.description')}
                className="form-control"
                onChange={this.handleDescChange.bind(this)}/>
            </div>
          </fieldset>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit.bind(this)}>{t('backend.activities.save_changes')}</button>
        </form>
      </div>
    );
  }
}

ReactMixin(EditForm.prototype, ReactI18n);

export default EditForm;