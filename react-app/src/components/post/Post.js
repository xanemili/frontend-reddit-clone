import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../../services/post'
import PostKarma from '../karma/PostKarma'
import CommentContainer from '../Comment/CommentContainer'
import CreateContent from '../sidebar/CreateContent'

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
            <div className="post_display">
                <div className='post_karma_container'>
                    <PostKarma id={post.id}/>
                </div>
                <div className="post_info_display">
                    {errors ? <div>{errors}</div> : ''}
                    <div className='post_header'>
                        <a href={`/r/${subreddit.name}`}>{`r/${subreddit.name}`}</a> <span>Posted by</span> <a href={`/users/${user.id}`}>{`${user.username}`}</a>
                    </div>
                    <h1 className='post_title'>{post.title}</h1>
                    <div>
                        <img className='image_display' src={post.content} />
                    </div>
                    <div><CommentContainer postId={postId}/></div>
                </div>
            </div>
        )
    }

    return (
        <div className="post_display">
            <div className='post_karma_container'>
                <PostKarma id={postId}/>
            </div>
            <div className="post_info_display">
                {errors ? <div>{errors}</div> : ''}
                <div className='post_header'>
                    <a href={`/r/${subreddit.name}`}>{`r/${subreddit.name}`}</a> <span>Posted by</span> <a href={`/users/${user.id}`}>{`${user.username}`}</a>
                </div>
                <h1 className='post_title'>{post.title}</h1>
                <div className='post_content'>{post.content}</div>
                <div><CommentContainer postId={postId}/></div>
            </div>
        </div>
    )

}

export default Post;
