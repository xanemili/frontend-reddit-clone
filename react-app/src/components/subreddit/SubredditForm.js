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
<<<<<<< HEAD
    if (!subreddit.errors) {
      return <Redirect to='/' />
=======
    console.log(subreddit)
    if (!subreddit.errors) {
      return <Redirect to='/r/subreddit.name' />
>>>>>>> main
    } else {
      setErrors(subreddit.errors)
    }
  };

<<<<<<< HEAD
=======
  if (!authenticated) {
    return <Redirect to='/login' />;
  }

>>>>>>> main
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
<<<<<<< HEAD
      </div>
      <button type='submit'>Create</button>
=======
      <button type='submit'>Create</button>
      </div>
>>>>>>> main
    </form>
  );
};

<<<<<<< HEAD
export default SubredditForm;
=======
export default SubredditForm;
>>>>>>> main
