import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createPost } from '../../services/post';
import { getSubreddits } from '../../services/subreddit'

const PostForm = ({authenticated}) => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('text')
  const [subreddits, setSubreddits] = useState([])
  const [subredditId, setSubredditId] = useState(1)
  const [redirect, setRedirect] = useState(false)

  const updateValue = (setfunc) => (e) => {
    setfunc(e.target.value)
  }

  const getAllSubreddits = async () => {
    let response = await getSubreddits()
    // console.log(response)
    setSubreddits(response.subreddits)
    console.log(response.subreddits)
    return response.subreddits
  }

  if (subreddits.length === 0){
      getAllSubreddits()
  }

  const submitPost = async (e) => {
    e.preventDefault();
    const post = await createPost(subredditId, title, type, content);
    // console.log(post)
    if (post) {
      setRedirect(true)
    } else {
      setErrors(post.errors)
    }
  };

  if (!authenticated) {
    return <Redirect to='/login' />;
  }

  if (redirect) {
      return <Redirect to='/' />
  }


  return(
    <form onSubmit={submitPost}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='title'>Title</label>
        <input
          name='title'
          type='text'
          placeholder='title'
          value={title}
          onChange={updateValue(setTitle)}
        />
      </div>
      <div>
      <label htmlFor='content'>Content</label>
        <input
          name='content'
          type='text'
          placeholder='content'
          value={content}
          onChange={updateValue(setContent)}
        />
      </div>
      <div>
      <label htmlFor='subreddits'>Subreddit</label>
        <select name="subreddits" id="post_subreddits" onChange={updateValue(setSubredditId)} >
            {subreddits.map((subreddit) => (
                <>
                  <div>{subreddit.id}</div>
                  <option value={subreddit.id}>{subreddit.name}</option>
                </>
            ))}

        </select>
      <button type='submit'>Create</button>
      </div>
    </form>
  );
};

export default PostForm;
