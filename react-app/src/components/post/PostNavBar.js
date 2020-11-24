import React, {useState, useEffect} from 'react'
import { Redirect, useParams } from 'react-router-dom';
import {getPost} from '../../services/post'


const PostNavbar = () => {
    const [post, setPost] = useState({})
    const [errors, setErrors] = useState('')
    const [subreddit, setSubreddit] = useState({})
    const [redirect, setRedirect] = useState(false)
    const {postId} = useParams();

    useEffect(() => {
        (async () => {
            let postDetails = await getPost(postId);
            if(!postDetails.errors) {
                setPost(postDetails)
                setSubreddit(postDetails.subreddit)
            } else {
                setErrors(post.errors);
            }
        })();
    }, [postId])

    const handleClick = () => {
        return setRedirect(true)
    }

    if (redirect) {
        return <Redirect to={`/r/${subreddit.name}`} />
    }

    return (
        <div className="post_navbar">
            {/* Will also contain the upvote/downvote button */}
            <span className="post_navbar_title">{post.title}</span>
            <button onClick={handleClick} className="post_navbar_button">Close</button>
        </div>
    )
}

export default PostNavbar;
