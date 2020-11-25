import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import Subreddit from "./subreddit/Subreddit";

function User() {
  const [user, setUser] = useState({});
  const [subreddits, setSubreddits] = useState([])
  const [posts, setPosts] = useState([])
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
      console.log(user)
      setUser(user);
      setSubreddits(user.subreddits)
      setPosts(user.posts)
    })();
  }, [userId]);


  if (!user) {
    return null;
  }

  return (
    <div>
      <div>
        <strong>User Id</strong> {userId}
      </div>
      <div>
        <strong>Username</strong> {user.username}
      </div>
      <div>
        <strong>Email</strong> {user.email}
      </div>
      <div>
        <strong>Birthday</strong> {user.created_at}
      </div>
      <div>
        <strong>subreddits</strong> {subreddits.map(subreddit => (
          <div key={subreddit.id}>{subreddit.name}</div>
        ))}
      </div>
      <div>
        <strong>posts</strong> {posts.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </div>
  );
}
export default User;
