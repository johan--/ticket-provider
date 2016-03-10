import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import OrganizerStore from '../../stores/organizer-store.jsx';
import AccountStore from '../../stores/account-store.jsx';
import AlertMessages from '../shared/alert-messages.jsx';
import Action from '../../actions/account-actions.jsx';
import _ from 'underscore';

class ContentContainer extends React.Component {
  constructor() {
    super();
    this.model = OrganizerStore.getModel();
    this.state = { organizer: this.model.attributes };
  }

  componentDidMount() {
    this.model.on('add remove reset change', function () {
      this.forceUpdate();
    }, this);
  }

  componentWillUnmount() {
    this.model.off(null, null, this);
  }

  handleAccountNameChange(e) {
    let updateState = this.state;
    updateState.organizer.account.name = e.target.value;
    this.setState(updateState);
  }

  handleAccountDescriptionChange(e) {
    let updateState = this.state;
    updateState.organizer.account.description = e.target.value;
    this.setState(updateState);
  }

  handleAccountSubmit(e) {
    e.preventDefault();
    Action.editAccount(_.pick(this.state.organizer.account, 'id', 'name', 'description'));
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="organizer-settings-container">
        <header>{t('backend.accounts.header')}</header>
        <form className="form-horizontal">
          <AlertMessages alertType="danger"/>
          <fieldset>
            <div className="form-group">
              <label htmlFor="name">{t('backend.events.name')}</label>
              <input
                value={this.state.organizer.account ? this.state.organizer.account.name : ''}
                name={t('backend.events.name')}
                className="form-control"
                onChange={this.handleAccountNameChange.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="description">{t('backend.events.description')}</label>
              <textarea
                value={this.state.organizer.account ? this.state.organizer.account.description : ''}
                name={t('backend.events.description')}
                className="form-control"
                onChange={this.handleAccountDescriptionChange.bind(this)}/>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleAccountSubmit.bind(this)}>{t('backend.accounts.update')}</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

ReactMixin(ContentContainer.prototype, ReactI18n);

export default ContentContainer;