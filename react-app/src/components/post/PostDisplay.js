import React from 'react'
import Post from './Post'
import PostNavBar from './PostNavBar'


const PostDisplay = ({authenticated}) => {

    return (
        <div className="post_display_container">
            <PostNavBar />
            <div className="insertHere">
                <Post authenticated={authenticated}/>
            </div>
        </div>
    )
}

export default PostDisplay
