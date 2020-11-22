import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createSubreddit } from '../../services/subreddit';

const SubredditForm = ({authenticated}) => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [rules, setRules] = useState('')

  const updateValue = (setfunc) => (e) => {
    setfunc(e.target.value)
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
    <form onSubmit={submitSubreddit}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          name='name'
          type='text'
          placeholder='Subreddit'
          value={name}
          onChange={updateValue(setName)}
        />
      </div>
      <div>
      <label htmlFor='About'>About</label>
        <input
          name='about'
          type='text'
          placeholder='About'
          value={about}
          onChange={updateValue(setAbout)}
        />
      </div>
      <div>
      <label htmlFor='Rules'>Rules</label>
        <input
          name='rules'
          type='text'
          placeholder='Rules'
          value={rules}
          onChange={updateValue(setRules)}
        />
      <button type='submit'>Create</button>
      </div>
    </form>
  );
};

export default SubredditForm;
