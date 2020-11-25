import React, { useReducer, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createSubreddit } from '../../services/subreddit';
import Rule from './Rules'


const reducer = (state, action) => {
  switch (action.type) {
    case "add-rule":
      return { rules: [...state.rules, { text:action.text }] };
    default:
      return state
  }

}


const SubredditForm = ({authenticated}) => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [ruleIds, setRuleIds] = useState([1])
  const [rules, setRules] = useState([]);
  // console.log('rules', rule)

  const updateValue = (setfunc) => (e) => {
    setfunc(e.target.value)
  }

  const createText = (e) => {
    let newRules = [...ruleIds]
    newRules.push(ruleIds.length + 1)
    setRuleIds(newRules)
  }

  const submitSubreddit = async (e) => {
    e.preventDefault();
    const subreddit = await createSubreddit(name, about, rules);
    console.log(subreddit)

    if (!subreddit.errors) {
      return <Redirect to='/r/subreddit.name' />
    } else {
      setErrors(subreddit.errors)
    }
  };

  if (!authenticated) {
    return <Redirect to='/login' />;
  }

  return(
    <div>
      <h1 className="subreddit__form-header">Create a subreddit</h1>
      <div className='subreddit__form__container'>
        <form onSubmit={submitSubreddit}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
          <h4>Info:</h4>
            <label className="subreddit__form__label" htmlFor='name'>Name</label>
            <input
              className="subreddit__form__input"
              name='name'
              type='text'
              placeholder='Subreddit'
              value={name}
              onChange={updateValue(setName)}
            />
          </div>
          <div>
          <label className="subreddit__form__label" htmlFor='About'>About</label>
            <input
              className="subreddit__form__input"
              name='about'
              type='text'
              placeholder='About'
              value={about}
              onChange={updateValue(setAbout)}
            />
          </div>
          <div>
          <div>
            <h4> Rules:</h4>
            {ruleIds.map((ruleId) => (
              <div key={ruleId}> <Rule id = {ruleId} rules={rules} setRules={setRules} /></div>
            ))}
            <button type= 'button' onClick={createText}>+</button>
          </div>
          <div className="create__subreddit">
            <button type='submit'>Create</button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubredditForm;
