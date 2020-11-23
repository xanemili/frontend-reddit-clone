import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post'

const Subreddit = () => {

  const [subreddit, setSubreddit] = useState({})
  const [posts, setPosts] = useState([])
  const [errors, setErrors] = useState('')
  const [postErrors, setPostErrors] = useState('')
  const { subredditName } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/subreddits/r/${subredditName}`)
      const subreddit = await response.json();
      if(!subreddit.errors) {
        setSubreddit(subreddit.subreddit);
      } else {
        setErrors(subreddit.errors);
      }
    })();
    console.log(errors)
  }, [subredditName])

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/posts/r/${subredditName}`)
      const posts = await response.json();
      if (!posts.errors) {
        setPosts(posts.posts)
      } else {
        setPostErrors(posts.errors);
      }
    })();
  }, [subredditName])

  if (!subreddit) {
    return null;
  }

  const postComponents = posts.map((post) => {
    return (
      <li key={post.id}>
        <Post id={post.id} title={post.title} type={post.type} content={post.content}/>
      </li>
    );
  })

  return (
    <div>
      {errors ? <div>{errors}</div> : ''}
      {console.log(errors)}
      <h1>{subreddit.name}</h1>
      <div>About: {subreddit.about}</div>
      <div>Rules: {subreddit.rules}</div>
      <ul>{postComponents}</ul>
    </div>
  )
}

export default Subreddit;
