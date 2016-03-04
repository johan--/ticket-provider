import React from 'react';
import ReactI18n from 'react-i18n';
import ReactMixin from 'react-mixin';
import $ from 'jquery';
import Backbone from 'backbone';

class Navbar extends React.Component {

  handleClick(e) {
    e.preventDefault();
    Backbone.history.navigate($(e.currentTarget).attr('href'), true);
  }

  render() {
    let t = this.getIntlMessage;
    return (
      <nav className="app-navbar navbar navbar-light bg-faded">
        <button className="navbar-toggler hidden-md-up"
                type="button"
                data-toggle="collapse"
                data-target="#exCollapsingNavbar">
          &#9776;
        </button>
        <div className="collapse navbar-toggleable-sm" id="exCollapsingNavbar">
          <a className="navbar-brand">
            Square
          </a>
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <a className="nav-link" onClick={this.handleClick} href="/app/events">{t('backend.navbar.event')}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={this.handleClick} href="/app/organizers">{t('backend.navbar.organizer')}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/organizers/sign_out">{t('backend.authentication.logout')}</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

ReactMixin(Navbar.prototype, ReactI18n);

export default Navbar;