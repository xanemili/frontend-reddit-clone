import React from 'react';

<<<<<<< HEAD
<<<<<<< HEAD

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
=======
=======
>>>>>>> post retrieval from the database
const Post = ({ title, type, content,  }) => {
  return (
    <>
      <div>
        title: {title}
      </div>
      <div>
        type: {type}
      </div>
      <div>
        content: {content}
      </div>
      <div>

      </div>
    </>
<<<<<<< HEAD
>>>>>>> post retrieval from the database
=======
>>>>>>> post retrieval from the database
  )
}

export default Post;
