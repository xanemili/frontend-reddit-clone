import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { createPost, uploadImage } from '../../services/post';
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
  const [image, setImage] = useState({})

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

  // Helper functions to help set the State in the form
  const updateValue = (setfunc) => (e) => {
    setfunc(e.target.value)
  }

  const setImageType = () => {
    setType("image")
  }

  const setTextType = () => {
    setType("text")
  }

  const setImageHelper = (e) => {
    setImage(e.target.files[0])

  }

  // Helper function to help handle the post submit request
  const submitTextPost = async (e) => {
    e.preventDefault();
    const post = await createPost(subredditId, title, type, content);
    if (!post.errors) {
      setRedirect(true)
    } else {
      setErrors(post.errors)
    }
  };

  // Handles the Image uploading onto AWS S3
  const submitImagePost = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("file", image)

    const newImage = await uploadImage(data)
    const imageUrl = newImage.output

    const post = await createPost(subredditId, title, type, imageUrl);
    if(!post.errors){
      setRedirect(true)

    } else {
      setErrors(post.errors)

    }
  }

  if (!authenticated) {
    return <Redirect to='/login' />;
  }

  if (redirect) {
      return <Redirect to={`/r/${subreddit}`} />
  }

  if (type === 'image'){
    return (
        <div id='form-container'>
        <div className='button-tab__header'>
          <button type='button' onClick={setTextType}>Text</button>
          <button className='active' type='button' onClick={setImageType}>Image</button>
        </div>
        <form encType='multipart/formdata' onSubmit={submitImagePost} className='submit-form'>
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
            <label htmlFor='subreddits'>Subreddit</label>
            <select name="subreddits" id="post_subreddits" onChange={updateValue(setSubredditId)} >
                {subreddits.map((subreddit) => (
                    <option key={subreddit.id} value={subreddit.id}>{subreddit.name}</option>
                ))}

            </select>
          </div>
          <label htmlFor="user_file">Upload Your File</label>
          <input type="file" name="user_file" required onChange={setImageHelper}/>
          <button type="submit">Upload</button>
        </form>
      </div>
    )
  }

  return(
    <div id='form-container'>
      <div className='button-tab__header'>
        <button className='active'type='button' onClick={setTextType}>Text</button>
        <button type='button' onClick={setImageType}>Image</button>
      </div>
      <form onSubmit={submitTextPost} className='submit-form'>
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
          <textarea
            name='content'
            placeholder='content'
            value={content}
            onChange={updateValue(setContent)}
            rows='5'
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
        </div>
        <button className='button-primary spacing__extra' type='submit'>Create</button>
      </form>
    </div>
  );

};

export default PostForm;
