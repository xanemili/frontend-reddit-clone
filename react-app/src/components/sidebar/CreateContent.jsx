import React from 'react';
import {NavLink} from 'react-router-dom';

const CreateContent = () => {

  return (
    <div className="sidebar__container">
      <div className="about__container">
        <div className= "about__title">Link Title Here</div>
        <div className="about__description">Add text here from when a user creates the subreddit</div>
        <div className="about__users">Total Users</div>
        <div className="about__date"> Created:</div>
        <NavLink style={{ width: 'fit-content', textDecoration: 'none' }} to="/subreddits/create" exact={true} activeClassName="active">
          <div className="create__btn">
              Create
          </div>
        </NavLink>
      </div>
      
      <div>
      <NavLink to="/r/AskReddit" exact={true} activeClassName="active">
        Basic
      </NavLink>
      </div>
    </div>
  )
}


//rules
//info
//

export default CreateContent;