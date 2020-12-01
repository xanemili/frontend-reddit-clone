import React from 'react';
import { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import sideContent from '../../services/sidebar'

const Sidebar= ({ username }) => {

  const [followed, setFollowed] = useState({});
  const [topSubs, setTopSubs] = useState([]);

  const updateValue = (func) => async (e) => {
    await func(e.target.value)
  }


  useEffect(() => {
    (async () => {
      let subResults = await sideContent(username)
        if(subResults) {
            setTopSubs(subResults.top_subreddits)
          }
        })();
      }, [])


    return(
      <div>
      <div className="home-sidebar__container">
          {/* <div className="home-sidebar__followed">
            <h4>Followed Communities</h4>
          </div>
          <ul>
            {topSubs.map((sub) => {
              return <li>/r/{sub.name}</li>
            })}
          </ul> */}
          <div className="home-sidebar__top">
            <h4>Top Communities</h4>
          </div>
          <ul className="home-sidebar__list">
          {topSubs.map((sub) => {
            return(
              <div className="home-sidebar__list-item" key={sub.id}>
                <NavLink key = {sub.id} className="sidebar__top-subreddits" style={{ width: 'fit-content', textDecoration: 'none' }} to={`/r/${sub.name}`} exact={true}>
                  <li>/r/{sub.name}</li>
                </NavLink>
                <div>Members: {sub.subscribers}</div>
              </div>
            )
            })}
          </ul>
          <NavLink style={{ width: 'fit-content', textDecoration: 'none' }} to="/subreddits/create" exact={true} activeClassName="active">
          <div className="create__btn">
              Create Community
          </div>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar;
