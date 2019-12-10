import React, {Component} from 'react';
import css from './Navbar.module.scss'
import {NavLink} from "react-router-dom";

class Navbar extends Component {

  render() {
    return (
      <div className={`${css.NavbarWrapper} mb-5`}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">CSV Explorer</a>
          <button className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse position-relative" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <NavLink to="/" exact className="nav-link">
                Home
              </NavLink>
              <li className="nav-item">
                <NavLink to="/changes" exact className="nav-link">
                  Changes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/settings" exact className="nav-link">
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
