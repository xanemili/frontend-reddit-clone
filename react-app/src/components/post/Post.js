import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../../services/post'
import PostKarma from '../karma/PostKarma'
import CommentContainer from '../Comment/CommentContainer'

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

    if(post.type === 'image'){
        return(
            <div>
                {errors ? <div>{errors}</div> : ''}
                <div className='post_header'>
                    <span className='post_subreddit'>{`r/${subreddit.name}`}</span> <span className='post_username'>{`Posted by ${user.username}`}</span>
                </div>
                <div className='post_karma'>
                    <PostKarma id={post.id}/>
                </div>
                <h1 className='post_title'>{post.title}</h1>
                <div>
                    <img src={post.content} />
                </div>
            </div>
        )
    }

    return (
        <div>
            {errors ? <div>{errors}</div> : ''}
            <div className='post_header'>
                <span className='post_subreddit'>{`r/${subreddit.name}`}</span> <span className='post_username'>{`Posted by ${user.username}`}</span>
            </div>
            <div className='post_karma'>
                <PostKarma id={post.id}/>
            </div>
            <h1 className='post_title'>{post.title}</h1>
            <div className='post_content'>{post.content}</div>
            <div><CommentContainer postId={postId}/></div>
        </div>
    )

}

export default Post;
