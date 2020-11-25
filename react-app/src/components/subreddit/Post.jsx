import React from 'react';


const Post = ({title, type, content, username, subreddit, created_on }) => {

  if (type === 'image'){
    return(
      <div>
        <h1>{title}</h1>
        <img src={content}/>

      </div>
    )
  }

  return (
    <div className='landing__posts'>
        <div className='title title-area'>
          {title}
        </div>
        <div>
          r/{subreddit} u/{username}  created on {created_on}
        </div>
        <div className='comments'>
          <a className='meta-area'>
            Comments
          </a>
        </div>

    </div>
  )
}

export default Post;
