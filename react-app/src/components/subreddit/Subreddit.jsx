import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Post from './Post'
import PostKarma from '../karma/PostKarma.jsx'

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
      <Link key={post.id} className='landing__posts__container'>
        <PostKarma id={post.id} />
        <Post id={post.id} title={post.title} type={post.type} content={post.content}/>
      </Link>
    );
  })

  return (
    <div>
        <div className=''>
          <div>{subreddit.name}</div>
          <div>/r/{subreddit.name}</div>
          <button className='button-primary'>
            Follow
          </button>
        </div>
      <div id='container'>
        {errors ? <div>{errors}</div> : ''}
        {console.log(errors)}
        <ul>{postComponents}</ul>
      </div>
    </div>
  )
}

export default Subreddit;
