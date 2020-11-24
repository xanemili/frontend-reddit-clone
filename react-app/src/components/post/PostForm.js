import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { createPost } from '../../services/post';
import { getSubreddits } from '../../services/subreddit'

const PostForm = ({authenticated}) => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('text')
  const [subreddit, setSubreddit] = useState('')
  const [subreddits, setSubreddits] = useState([])
  const [subredditId, setSubredditId] = useState(0)
  const [redirect, setRedirect] = useState(false)

  // Calls the helper function when the component is loaded
  useEffect(() => {
    getAllSubreddits()
  }, [])

  // Will only set the subreddit after someone as changed the selected subreddit
  useEffect(() => {
    for (let oneSub of subreddits){
      if (oneSub.id === Number(subredditId)){
        setSubreddit(oneSub.name)
      }
    }
  }, [subredditId])

  // Helper function to make a fetch request and set subreddits to be displayed in the select field.
  // Sets the currently selected subredditId to be the id from first element.
  // Also sets the name of the subreddit to redirect to from the response
  const getAllSubreddits = async () => {
    let response = await getSubreddits()
    setSubreddits(response.subreddits)
    setSubredditId(response.subreddits[0].id)
    setSubreddit(response.subreddits[0].name)
    return response.subreddits
  }

  const updateValue = (setfunc) => (e) => {
    setfunc(e.target.value)
  }

  // Helper function to help handle the post submit request
  const submitPost = async (e) => {
    e.preventDefault();
    const post = await createPost(subredditId, title, type, content);
    if (!post.errors) {
      setRedirect(true)
    } else {
      setErrors(post.errors)
    }
  };

  if (!authenticated) {
    return <Redirect to='/login' />;
  }

  if (redirect) {
      return <Redirect to={`/r/${subreddit}`} />
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
          required
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
          required
        />
      </div>
      <div>
      <label htmlFor='subreddits'>Subreddit</label>
        <select name="subreddits" id="post_subreddits" onChange={updateValue(setSubredditId)} >
            {subreddits.map((subreddit) => (
                <option key={subreddit.id} value={subreddit.id}>{subreddit.name}</option>
            ))}

        </select>
      <button type='submit'>Create</button>
      </div>
    </form>
  );
};

export default PostForm;
