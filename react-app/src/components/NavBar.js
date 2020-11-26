import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import searchFetch from '../services/search'


const NavBar = ({ username, id, authenticated, setAuthenticated, subscriptions }) => {
  const [search, setSearch] = useState('')

  const updateValue= async (e) => {
    await setSearch(e.target.value)
  }

  const searchRes = async() => {
    if (search !== ""){
      let searchResults = await searchFetch(search);
      if (searchResults) {
        console.log(searchResults)
      }
    }
  }

  const selectOptions = (subs) => {
    console.log(subs)
    return (
      <select>
      {subs.map( sub => (
          <option>
          {sub}
          </option>
      ))}
    </select>
    )
  }

  return (
    <header id="header">
      <nav className="top-menu" />
      <div className="main-header">

        <NavLink to="/" exact={true} activeClassName="active" className="default-header" id="header-img">
          Reddit Clone
          </NavLink>
        <div className="tab-menu" />
          <div className="search__container">
            <div className="search__elements">
              <button className="search" onClick={searchRes}></button>
              <div className="search__bar">
                <input
                  className="search__input"
                  name="search"
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={updateValue}
                />
              </div>
            </div>
          </div>

          {selectOptions(subscriptions)}

        <div className="user-header">
          {authenticated ? (
            <span>
              Hello {username}
              <NavLink to={`/users/${id}`} exact={true} activeClassName="active">
                My Profile
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
