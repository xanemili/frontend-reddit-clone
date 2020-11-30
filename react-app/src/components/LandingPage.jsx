import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Post from './subreddit/Post'
import PostKarma from './karma/PostKarma.jsx'
import loadingGif from '../img/loading.gif'


const LandingPage = () => {

  const [posts, setPosts] = useState([])
  const [errors, setErrors] = useState('')

  const [loading, setloading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {

      const postResponse = await fetch(`/api/subreddits/`)
      const posts = await postResponse.json();
      console.log(posts)

      if(mounted && !posts.errors) {
        setloading(false)
        setPosts(posts.posts)
      } else if (mounted) {
        setErrors('');
      }
    };

    fetchData();
    console.log(posts)

    return () => {
      mounted = false
    }
  }, [])

  const postComponents = posts.map((post) => {
    return (
      <Link key={post.id} className='landing__posts__container' to={`/r/${post.subreddit.name}/post/${post.id}`}>
        <PostKarma id={post.id} />
        <Post id={post.id} username={post.user.username} subreddit={post.subreddit.name} created_on={post.created_on} title={post.title} type={post.type} content={post.content}/>
      </Link>
    );
  })

  return (
    <div> {loading ? <img src={loadingGif} alt="loading"/> :
      <>
        <div className='content__subheader'>
          <div>
          </div>
        </div>
      <div id='container'>
        {errors ? <div>{errors}</div> : ''}
        <ul>{postComponents}</ul>
      </div>
      </>
    }
    </div>
  )
}

export default LandingPage;
