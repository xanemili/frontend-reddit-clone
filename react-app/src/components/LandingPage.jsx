import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import Post from './subreddit/Post'
import PostKarma from './karma/PostKarma.jsx'
import loadingGif from '../img/loading.gif'
import Sidebar from './sidebar/Sidebar'


const LandingPage = ({ user }) => {

  const [posts, setPosts] = useState([])
  const [errors, setErrors] = useState('')

  const [loading, setloading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {

      const postResponse = await fetch(`/api/subreddits/`)
      const posts = await postResponse.json();


      if(mounted && !posts.errors) {
        setloading(false)
        setPosts(posts.posts)
      } else if (mounted) {
        setErrors('');
      }
    };

    fetchData();


    return () => {
      mounted = false
    }
  }, [])

  const postComponents = posts.map((post) => {
    return (
      <div className='landing__posts__container' key={post.id}>
        <PostKarma id={post.id} />
          <Post id={post.id} username={post.user.username} subreddit={post.subreddit.name} created_on={post.created_on} title={post.title} type={post.type} content={post.content}/>
      </div>
    );
  })

  return (
    <div> {loading ? <img src={loadingGif} alt="loading"/> :
      <>
      <div id='container'>
        {errors ? <div>{errors}</div> : ''}
        <ul>{postComponents}</ul>
        <Sidebar {...user} />
      </div>
      </>
    }
    </div>
  )
}

export default LandingPage;
