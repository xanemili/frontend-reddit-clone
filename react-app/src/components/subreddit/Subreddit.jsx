import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Post from './Post'
import PostKarma from '../karma/PostKarma.jsx'
import CreateContent from '../sidebar/CreateContent'
import Comment from '../Comment/Comment'
import CommentBox from '../Comment/CommentBox';


const Subreddit = ({subscriptions}) => {

  const [subreddit, setSubreddit] = useState({rules:""})
  const [posts, setPosts] = useState([])
  const [errors, setErrors] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [postErrors, setPostErrors] = useState('')

// this is a fake API for testing purposes//
  const comments = [
    {
      id: "1",
      postid: "1",
      userid: "user1",
      content: "this is user1",
      createdAt:"2017-05-25 17:39:49.554808-05", 
      updatedAt:"2017-05-25 17:39:49.554808-05",
      children: [
        {
          id: "2",
          postid: "1",
          userid: "user2",
          content: "user2 responding to user1's comment",
          createdAt: "2020-11-23 12:59:55",
          updatedAt: "2020-11-23 12:59:55",
          children: [
            {
              id: "3",
              postid: "1",
              userid: "user1",
              content: "user1 responding to user2's nested comment",
              createdAt: "2020-11-23 13:59:55",
              updatedAt: "2020-11-23 13:59:55",
              children: []
            }
          ]
        }
      ]
    },
    {
      id: "4",
      postid: "1",
      userid: "user1",
      content: "this is user1",
      createdAt: "2020-11-23 11:59:55",
      updatedAt: "2020-11-23 11:59:55",
      children: [
        {
          id: "5",
          postid: "1",
          userid: "user2",
          content: "user2 responding to user1's comment",
          createdAt: "2020-11-23 12:59:55",
          updatedAt: "2020-11-23 12:59:55",
          children: [
            {
              id: "6",
              postid: "1",
              userid: "user1",
              content: "user1 responding to user2's nested comment",
              createdAt: "2020-11-23 13:59:55",
              updatedAt: "2020-11-23 13:59:55",
              children: []
            }
          ]
        }
      ]
    },
  ]
// ^^^this is a fake API for testing purposes^^^//

  const [subreddit, setSubreddit] = useState({})
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

      if(!subreddit.errors && mounted &&!posts.errors) {
        setloading(false)
        setSubreddit(subreddit.subreddit);
        setPosts(posts.posts)
      } else if (mounted && !subreddit.errors) {
        setErrors(subreddit.errors);
      }
    };

    fetchData();
    console.log(subscriptions, subredditName)
    console.log(subscriptions.indexOf(subredditName))
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
      method,
      headers: {'Content-Type': 'application/json'}
    })
    let subscribe = await response.json()
    // console.log(subscribe)
    if (!subscribe.errors){
      setSubscribed(!subscribed)
    }
  }

  const postComponents = posts.map((post) => {
    return (
      <Link key={post.id} className='landing__posts__container'>
        <PostKarma id={post.id} />
        <Post id={post.id} username={post.user.username} subreddit={post.subreddit.name} created_on={post.created_on} title={post.title} type={post.type} content={post.content}/>
      </Link>
    );
  })
  return (
    <div> {loading ? <div>loading</div> :
      <>
        <div className=''>
          <div>{subreddit.name}</div>
          <div>/r/{subreddit.name}</div>
          <button className='button-primary' onClick={toggleSubscription}>
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
          </button>
        </div>
        <CreateContent name={subreddit.name} about={subreddit.about} created={subreddit.created_on} rules={subreddit.rules} />
        <div id='container'>
          {errors ? <div>{errors}</div> : ''}
          {console.log(errors)}
          <ul>{postComponents}</ul>
        </div>
        <CommentBox/>
        {comments.map(comment => <Comment comment={comment} />)}
      </>
    }
    </div>
  )

}

export default Subreddit;
