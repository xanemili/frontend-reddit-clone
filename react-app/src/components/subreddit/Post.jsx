import React from 'react';


const Post = ({title, type, content,  }) => {

  return (
    <div className='landing__posts'>
        <div className='title title-area'>
          {title}
        </div>
        <div>
          owner
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
