import React from 'react'
import Post from './Post'
import PostNavBar from './PostNavBar'


const PostDisplay = ({authenticated}) => {

    return (
        <>
            <PostNavBar />
            <div className='post_content_container'>
                <Post  authenticated={authenticated}/>
            </div>
        </>
    )
}

export default PostDisplay
