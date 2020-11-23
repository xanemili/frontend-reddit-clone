import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Subreddit = () => {

  const [subreddit, setSubreddit] = useState({})
  const [postList, setPostList] = useState({})
  const { subredditName } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/subreddits/r/${subredditName}`)
      const subreddit = await response.json();
      console.log(subreddit)
      setSubreddit(subreddit);
    })();
  }, [subredditName])

  if (!subreddit) {
    return null;
  }

  return (
    <div>
    </div>
  )
}

export default Subreddit;
