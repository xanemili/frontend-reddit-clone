import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../services/post'

const Post = () => {
    // Comment creation field and displaying comments will be a seperate component
    // Comment/Sidebar/Navbar can be integrated as seperate components
    const [post, setPost] = useState({})
    const [errors, setErrors] = useState('')
    const [subreddit, setSubreddit] = useState({})
    const [user, setuser] = useState({})
    const {postId} = useParams();

    useEffect(() => {
        (async () => {
            let postDetails = await getPost(postId);
            if(!postDetails.errors) {
                setPost(postDetails)
                setSubreddit(postDetails.subreddit)
                setuser(postDetails.user)
            } else {
                setErrors(post.errors);
            }
        })();
    }, [postId])

    // console.log(post)
    // console.log('subreddit', subreddit)

    if(post){
        return (
            <div>
                {errors ? <div>{errors}</div> : ''}
                <div className='post_header'>
                    <span className='post_subreddit'>{`r/${subreddit.name}`}</span> <span className='post_username'>{`Posted by ${user.username}`}</span>
                </div>
                <h1 className='post_title'>{post.title}</h1>
                <div className='post_content'>{post.content}</div>
            </div>
        )

    }
}

export default Post;
