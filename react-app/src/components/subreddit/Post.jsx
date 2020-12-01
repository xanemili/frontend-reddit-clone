import React from 'react';
import {Link} from 'react-router-dom'


const Post = ({title, type, content, username, subreddit, created_on, id }) => {

  if (type === 'image'){
    return(
      <div>
        <h3 className="post-title">{title}</h3>
        <div className='post_header'>
          r/{subreddit} u/{username}  created on {created_on}
        </div>
        <img className="post-img" src={content}/>
        <div className='meta-area'>
            Comments
        </div>
      </div>
    )
  }

  return (
    <div className='landing__posts'>
      <Link to={`/r/${subreddit}/post/${id}`} />
        <div className='title title-area'>
          {title}
        </div>
        <div className='post_header'>
          r/{subreddit} u/{username}  created on {created_on}
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
