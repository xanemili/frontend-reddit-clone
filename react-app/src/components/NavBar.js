import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ authenticated, setAuthenticated }) => {
  return (
    <header id="header">
      <nav className="top-menu" />
      <div className="main-header">

        <NavLink to="/" exact={true} activeClassName="active" className="default-header" id="header-img">
          Reddit Clone
          </NavLink>
        <div classname="tab-menu" />

        <div className="user-header">
          {authenticated ? (
            <span>
              Hello{'insert user'}
              <NavLink to="/users" exact={true} activeClassName="active">
                Users
                </NavLink>
            </span>
          ) : (
              <span>
                Want to join?
                <NavLink to="/sign-up" exact={true} activeClassName="active">
                  Sign up
            </NavLink> in
              seconds. Or
                <NavLink to="/login" exact={true} activeClassName="active">
                  Login
            </NavLink>
              </span>
            )}
        </div>

        <LogoutButton setAuthenticated={setAuthenticated} />
      </div>
    </header>
  );
}

export default NavBar;
