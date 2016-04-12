import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import OrganizerStore from '../../stores/organizer-store.jsx';
import AccountStore from '../../stores/account-store.jsx';
import AlertMessages from '../shared/alert-messages.jsx';
import AccountAction from '../../actions/account-actions.jsx';
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

  handleSubmit(e) {
    e.preventDefault();
    AccountAction.edit(_.pick(this.state.organizer.account, 'id', 'name', 'description'));
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <div className="organizer-settings-container">
        <header>{t('backend.accounts.header')}</header>
        <form className="form-horizontal">
          <AlertMessages event="errorAccount" alertType="danger"/>
          <AlertMessages event="successAccount" alertType="success"/>
          <fieldset>
            <div className="form-group">
              <label htmlFor="api-token">{t('backend.accounts.token')}</label>
              <h4>{this.state.organizer.account ? this.state.organizer.account.api_token : ''}</h4>
            </div>
            <div className="form-group">
              <label htmlFor="name">{t('backend.accounts.name')}</label>
              <input
                value={this.state.organizer.account ? this.state.organizer.account.name : ''}
                name="name"
                className="form-control"
                onChange={this.handleAccountNameChange.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="description">{t('backend.accounts.description')}</label>
              <textarea
                value={this.state.organizer.account ? this.state.organizer.account.description : ''}
                name="description"
                className="form-control"
                onChange={this.handleAccountDescriptionChange.bind(this)}/>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit.bind(this)}>{t('backend.accounts.save_changes')}</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

ReactMixin(ContentContainer.prototype, ReactI18n);

export default ContentContainer;