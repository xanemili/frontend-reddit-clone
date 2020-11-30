import React from 'react';
import {NavLink} from 'react-router-dom';


<<<<<<< HEAD
const CreateContent = ({ name, about, created, rules, subCount }) => {
  
=======
const CreateContent = ({ name, about, created, rules }) => {

>>>>>>> pulling in landing page and more styling
  let ruleList = rules.split('#')


  return (
    <div className= 'sidebar__container'>
      <div className="about__container">
        <h3 className= "about__title">{name}</h3>
        <h4 className= 'about__header'>About</h4>
        <div className="about__description">{about}</div>
  <div className="about__users">Members: {subCount}</div>
        <div className="about__date"> Created: {created}</div>
      </div>
      <div className='rules__container'>
        <h4 className='rules__header'>Rules:</h4>
        {ruleList.map((rule, idx) => {
          if (rule !== ""){
            return <li className='rules' key={idx}>{rule}</li>
          }
        })}
        <NavLink style={{ width: 'fit-content', textDecoration: 'none' }} to="/subreddits/create" exact={true} activeClassName="active">
          <div className="create__btn">
              Create
          </div>
        </NavLink>
      </div>
    </div>
  )
}


//rules
//info
//

export default CreateContent;
