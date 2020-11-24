import React from 'react';
import {NavLink} from 'react-router-dom';

const Sidebar= () => {

  return(
    <div>
      <div className="home-sidebar__container">
          <div className="home-sidebar__followed">
            <h4>Followed Communities</h4>
          </div>
          <ul>
            <li>/r/one</li>
            <li>/r/two</li>
            <li>/r/three</li>
          </ul>
          <div className="home-sidebar__top">
            <h4>Top Communities</h4>
          </div>
          <ul>
            <li>/r/four</li>
            <li>/r/five</li>
            <li>/r/six</li>
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