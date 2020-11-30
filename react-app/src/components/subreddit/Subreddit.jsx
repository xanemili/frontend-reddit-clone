import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Post from './Post'
import PostKarma from '../karma/PostKarma.jsx'
import CreateContent from '../sidebar/CreateContent'
import loadingGif from '../../img/loading.gif'

// Utility function to convert comment list into nested form

const Subreddit = ({subscriptions, setSubscriptions}) => {

  const [subreddit, setSubreddit] = useState({ rules: "" })
  const [posts, setPosts] = useState([])
  const [errors, setErrors] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [postErrors, setPostErrors] = useState('')
  const [postList, setPostList] = useState({})
  const { subredditName } = useParams();
  const [loading, setloading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      const subredditResponse = await fetch(`/api/subreddits/r/${subredditName}`)
      const subreddit = await subredditResponse.json();

      const postResponse = await fetch(`/api/posts/r/${subredditName}`)
      const posts = await postResponse.json();

      if (!subreddit.errors && mounted && !posts.errors) {
        setloading(false)
        setSubreddit(subreddit.subreddit);
        setPosts(posts.posts)
      } else if (mounted && !subreddit.errors) {
        setErrors(subreddit.errors);
      }
    };

    fetchData();
    if (subscriptions.indexOf(subredditName) !== -1){
      setSubscribed(true);
    }

    return () => {
      mounted = false
    }
  }, [subredditName, setSubreddit])

  const toggleSubscription = async (e) => {
    e.preventDefault()
    let method = 'POST'
    if (subscribed) {
      method = 'DELETE'
    }
    let response = await fetch(`/api/users/subscriptions`, {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        subreddit: subredditName
      })
    })
    let subscribe = await response.json()
    if (!subscribe.errors){
      setSubscribed(!subscribed)
      setSubscriptions({type: subscribe.type, name: subscribe.name, subscriptions: subscribe.subscription})
    }
  }

  const postComponents = posts.map((post) => {
    return (
      <Link key={post.id} className='landing__posts__container' to={`/r/${subredditName}/post/${post.id}`}>
        <PostKarma id={post.id} />
        <Post id={post.id} username={post.user.username} subreddit={post.subreddit.name} created_on={post.created_on} title={post.title} type={post.type} content={post.content}/>
      </Link>
    );
  })



  return (
    <div> {loading ? <img src={loadingGif} alt="loading"/> :
      <>
        <div className='content__subheader'>

          <div className="subreddit-title">
            <h3 id={'subreddit__name'}>{subreddit.name}</h3>
          </div>
          <div className="subscribe-btn">
            <button className='button-primary' onClick={toggleSubscription}>
              {subscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
          </div>
        </div>

      <CreateContent name={subreddit.name} about={subreddit.about} created={subreddit.created_on} rules={subreddit.rules} subCount={subreddit.subscribers} />
      <div id='container'>
        {errors ? <div>{errors}</div> : ''}
        <ul>{postComponents}</ul>
        <CreateContent name={subreddit.name} about={subreddit.about} created={subreddit.created_on} rules={subreddit.rules} subCount={subreddit.subscribers} />
      </div>
      </>
    }
    </div>
  )
}


export default Subreddit;
