import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import Store from '../../stores/organizer-store.jsx';
import AlertMessages from '../shared/alert-messages.jsx';
import OrganizerAction from '../../actions/organizer-actions.jsx';
import _ from 'underscore';

class ContentContainer extends React.Component {
    constructor() {
        super();
        this.state = { organizer: Store.getModel().attributes }
    }

    componentDidMount() {
        this.state.on('add remove reset change', function() {
            this.forceUpdate();
        }, this);
    }

    componentWillUnmount() {
        this.state.off(null, null, this);
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
        updateState.organizer.password_conformation = e.target.value;
        this.setState(updateState);
    }

    handleCurrentPasswordChange(e) {
        let updateState = this.state;
        updateState.organizer.current_password = e.target.value;
        this.setState(updateState);
    }

    handleSubmit(e) {
        e.preventDefault();
        OrganizerAction.edit(_.pick(this.state.organizer, 'name', 'password', 'password_confirmation', 'current_password'));
    }

    render() {
        let t = this.getIntlMessage; console.log(this.state);
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
                            <h2>{this.state.get('role')}</h2>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">{t('backend.authentication.password')}</label>
                            <input
                                name={t('backend.authentication.password')}
                                className="form-control"
                                onChange={this.handlePasswordChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_confirmation">{t('backend.authentication.password_confirmation')}</label>
                            <input
                                name={t('backend.authentication.password_confirmation')}
                                className="form-control"
                                onChange={this.handlePasswordConfirmChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="current_password">{t('backend.authentication.current_password')}</label>
                            <input
                                name={t('backend.authentication.current_password')}
                                className="form-control"
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