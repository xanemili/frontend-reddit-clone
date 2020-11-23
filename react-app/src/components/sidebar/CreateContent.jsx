import React from 'react';
import {NavLink} from 'react-router-dom';

const CreateContent = () => {

  return (
    <div>
      <div>
      <NavLink to="/subreddits/create" exact={true} activeClassName="active">
        Create
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


export default CreateContent;