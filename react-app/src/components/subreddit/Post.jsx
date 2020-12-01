import React from 'react';
import {Link} from 'react-router-dom'


const Post = ({title, type, content, username, subreddit, created_on, id, userId }) => {

  if (type === 'image'){
    return(
      <div>
        <h3 className="post-title">{title}</h3>
        <div className='post_header'>
          <a href={`/r/${subreddit}`}>{`r/${subreddit}`}</a> <span>Posted by</span> <a href={`/users/${userId}`}>{`${username}`}</a>  created on {created_on}
        </div>
        <Link to={`/r/${subreddit}/post/${id}`}>
          <img className="post-img" src={content}/>
        </Link>
        <div className='meta-area'>
            Comments
        </div>
      </div>
    )
  }

  return (
    <div className='landing__posts'>
      <Link to={`/r/${subreddit}/post/${id}`}>
        <div className='title title-area'>
          {title}
        </div>
      </Link>
        <div className='post_header'>
          <a href={`/r/${subreddit}`}>{`r/${subreddit}`}</a> <span>Posted by</span> <a href={`/users/${userId}`}>{`${username}`}</a>  created on {created_on}
        </div>
        <div className='comments'>
          <div className='meta-area'>
            Comments
          </div>
        </div>
    </div>
  )
}

export default Post;
