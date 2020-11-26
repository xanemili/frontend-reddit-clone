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
      console.log(subResults);
        if(subResults) {
            setTopSubs(subResults.top_subreddits)
          }
        })();
      }, [])
      
      
    return(
      <div>
      {console.log(typeof topSubs)}
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
          <ul>
          {topSubs.map((sub) => {
              return <li key = {sub.id}>/r/{sub.name}</li>
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