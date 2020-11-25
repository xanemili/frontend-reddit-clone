import React, { useState, useEffect } from "react";
import {useParams, Link, NavLink} from "react-router-dom";
import UserSidebar from './sidebar/UserSidebar'
import Post from './subreddit/Post'
import PostKarma from './karma/PostKarma.jsx'

// Use createContent sidebar instead of Sidebar component to load the sidebar

function User() {
  const [user, setUser] = useState({});
  const [subreddits, setSubreddits] = useState([])
  const [posts, setPosts] = useState([])
  const [karma, setKarma] = useState(0)
  const [display, setDisplay] = useState('')
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      // console.log(user)
      setUser(user);
      setSubreddits(user.subreddits)
      setPosts(user.posts)
    })();
  }, [userId]);

  // Once posts are populated, loop through each post and add up the karma.
  useEffect(() => {
    if(!posts){
      return
    }

    let num = karma
    for (let post of posts){
      num += Number(post.karma)
    }
    setKarma(num)
  }, [posts])

  const setPostDisplay = () => {
    setDisplay('post')
  }

  const setSubredditDisplay = () => {
    console.log(posts)
    setDisplay('subreddit')
  }

  if (!user) {
    return null;
  }

  const postComponents = posts.map((post) => {
    console.log('post', post)

    return (
      <Link key={post.id} className='landing__posts__container'>
        <PostKarma id={post.id} />
        <Post id={post.id} username={user.username} subreddit={post.subreddit.name} created_on={post.created_on} title={post.title} type={post.type} content={post.content}/>
      </Link>
    );
  })

  if (display === 'post'){
    return (
      <div>
        <button onClick={setSubredditDisplay}>Subreddits</button>
        <button onClick={setPostDisplay}>Posts</button>
        <UserSidebar name={user.username} created={user.created_at} karma={karma} />
        <div id='container'>
          <ul>{postComponents}</ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={setSubredditDisplay}>Subreddits</button>
      <button onClick={setPostDisplay}>Posts</button>
      <UserSidebar name={user.username} created={user.created_at} karma={karma} />
      <div>
        <strong>subreddits</strong> {subreddits.map(subreddit => (
          <div>
            <NavLink to={`/r/${subreddit.name}`}>{subreddit.name}</NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
export default User;
