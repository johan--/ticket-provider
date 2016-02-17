import React from 'react';

class Navbar extends React.Component {
  render() {
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
              <a className="nav-link" href="#">Event</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;