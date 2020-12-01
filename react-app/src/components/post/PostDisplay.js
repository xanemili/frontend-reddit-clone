import React from 'react'
import Post from './Post'
import PostNavBar from './PostNavBar'


const PostDisplay = ({authenticated}) => {

    return (
        <div className="post_display_container">
            <PostNavBar />
            <Post authenticated={authenticated}/>
        </div>
    )
}

export default PostDisplay
