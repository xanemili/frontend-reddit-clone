import React from 'react';


const Post = ({title, type, content, username, subreddit, created_on }) => {

  if (type === 'image'){
    return(
      <div>
        <h3 className="post-title">{title}</h3>
        <img className="post-img" src={content}/>
        <div>
          r/{subreddit} u/{username}  created on {created_on}
        </div>
        <div className='meta-area'>
            Comments
        </div>
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
          <div className='meta-area'>
            Comments
          </div>
        </div>

    </div>
  )
}

export default Post;
