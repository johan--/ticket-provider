import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import Store from '../../stores/organizer-store.jsx';
import AlertMessages from '../shared/alert-messages.jsx';
import OrganizerAction from '../../actions/organizer-actions.jsx';
import _ from 'underscore';
import AppConst from '../../app-constant.jsx'

class ContentContainer extends React.Component {
    constructor() {
        super();
        this.model = Store.getModel();
        this.state = {organizer: this.model.attributes};
    }

    componentDidMount() {
        this.model.on('add remove reset change', function() {
            this.forceUpdate();
        }, this);
    }

    componentWillUnmount() {
        this.model.off(null, null, this);
    }

    handleNameChange(e) {
        let updateState = this.state;
        updateState.organizer.name = e.target.value;
        this.setState(updateState);
    }

    handlePasswordChange(e) {
        let updateState = this.state;
        updateState.organizer.password = e.target.value;
        this.setState(updateState);
    }

    handlePasswordConfirmChange(e) {
        let updateState = this.state;
        updateState.organizer.password_confirmation = e.target.value;
        this.setState(updateState);
    }

    handleCurrentPasswordChange(e) {
        let updateState = this.state;
        updateState.organizer.current_password = e.target.value;
        this.setState(updateState);
    }

    handleSubmit(e) {
        e.preventDefault();
        OrganizerAction.edit(_.pick(this.state.organizer, 'id', 'name', 'current_password', 'password', 'password_confirmation'));
    }

    render() {
        let t = this.getIntlMessage;
        return (
            <div className="organizer-container">
                <header>>> {t('backend.organizers.header')}</header>
                <form className="form-horizontal" >
                    <AlertMessages alertType="danger" />
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="email">{t('backend.authentication.email')}</label>
                            <h2>{this.state.organizer.email}</h2>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">{t('backend.authentication.name')}</label>
                            <input
                                value={this.state.organizer.name}
                                name={t('backend.events.name')}
                                className="form-control"
                                onChange={this.handleNameChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">{t('backend.organizers.role')}</label>
                            <h2>{AppConst.roles[this.state.organizer.role]}</h2>

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">{t('backend.authentication.password')}</label>
                            <input
                                name={t('backend.authentication.password')}
                                className="form-control"
                                type="password"
                                onChange={this.handlePasswordChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_confirmation">{t('backend.authentication.password_confirmation')}</label>
                            <input
                                name={t('backend.authentication.password_confirmation')}
                                className="form-control"
                                type="password"
                                onChange={this.handlePasswordConfirmChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="current_password">{t('backend.authentication.current_password')}</label>
                            <input
                                name={t('backend.authentication.current_password')}
                                className="form-control"
                                type="password"
                                onChange={this.handleCurrentPasswordChange.bind(this)}/>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.handleSubmit.bind(this)}>{t('backend.organizers.update')}</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

ReactMixin(ContentContainer.prototype, ReactI18n);

export default ContentContainer;