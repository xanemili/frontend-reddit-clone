import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import searchFetch from '../services/search'


const NavBar = ({ username, id, authenticated, setAuthenticated, subscriptions }) => {
  const [search, setSearch] = useState('')
  const [menuToggle, setMenuToggle] = useState(false)
  const [searchToggle, setSearchToggle] = useState(false)
  const [searchList, setSearchList] = useState([])

  const updateValue= async (e) => {
    await setSearch(e.target.value)
  }

  const searchRes = async() => {
    if (search !== ""){
      let searchResults = await searchFetch(search);
      if (searchResults) {
        let subArray = []
        searchResults.subreddits.forEach( sub => subArray.push(sub.name))
        setSearchList(subArray)
      }
    }
  }

  const showMenu = () => {
    setMenuToggle(!menuToggle)
  }

  const showSearch = () => {
    setSearchToggle(!searchToggle)
  }

  const selectOptions = (arr, toggle) => {
    return (
      <>
      {toggle && arr ? <div className={`dropdown__subreddit__content`}>
        {arr.map( (sub, idx) => (
          <div key={idx}>
            <NavLink to={`/r/${sub}`} onClick={showSearch}>
              {sub}
            </NavLink>
          </div>
        ))}
      </div> : ''}
      </>)
  }

  return (
    <header id="header">
      <nav className="top-menu" />
      <div className="main-header">
        <NavLink to="/" exact={true} activeClassName="active" className="default-header" id="header-img" />
        <div className="tab-menu">
        {authenticated ?
          <div className='dropdown__subreddit'>
            <div className='dropdown__button' onClick={showMenu}>
              My Subscriptions
            </div>
            {selectOptions(subscriptions, menuToggle)}
          </div> : ""
        }
        </div>
        <div className="search__container">

          <div className="search__elements">
            <button className="search" onClick={searchRes}></button>
            <div className="search__bar" onClick={showSearch}>
              <input
                className="search__input"
                name="search"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={async (e) => {
                  await updateValue(e)
                  await searchRes()
                }}
              />

            <div>
              {selectOptions(searchList, searchToggle)}
            </div>
            </div>
          </div>


        </div>

        <div className="user-header">
          {authenticated ? (
            <>
            <div className= "navbar-username">
              Hello {username}!
            </div>
            <div  className= "navbar-profile-link">
              <NavLink to={`/users/${id}`} exact={true} activeClassName="active">
                My Profile
              </NavLink>
                <LogoutButton  setAuthenticated={setAuthenticated} />
            </div>
            </>
          ) : (
              <div className="navbar-user-router-container">
                Want to join?
                <div className="navbar_user_router">
                  <NavLink to="/sign-up" exact={true} activeClassName="active">
                    Sign up
              </NavLink> in
                seconds. Or {' '}
                  <NavLink to="/login" exact={true} activeClassName="active">
                    Login
              </NavLink>

                </div>
              </div>
            )}
        </div>

      </div>
    </header>
  );
}

export default NavBar;
