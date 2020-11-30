import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Comment from '../Comment/Comment'
import CommentForm from '../Comment/CommentForm'
import store from '../redux/store'
import reducer from '../../services/commentReducer'



function nestComments(commentList) {
    const commentMap = {};

    // move all the comments into a map of id => comment
    commentList.forEach(comment => commentMap[comment.id] = comment);

    // iterate over the comments again and correctly nest the children
    commentList.forEach(comment => {
        if (comment.parentId !== null) {
            const parent = commentMap[comment.parentId];
            (parent.children = parent.children || []).push(comment);
        }
    });

    // filter the list to return a list of correctly nested comments
    return commentList.filter(comment => {
        return comment.parentId === null;
    });
}

const CommentContainer = () => {
    const [loading, setLoading] = useState(true)
    const [comments, dispatch] = useReducer(reducer, [])
    
    useEffect(() => {
        let mounted = true
        const fetchData = async () => {
            const commentResponse = await fetch(`/api/comments/post/92`)
            const comments = await commentResponse.json();

            console.log(comments)
            if (!comments.errors && mounted) {
                setLoading(false)
                dispatch({ type: 'GET_COMMENT', item: comments.comments })
            }
        }


        fetchData()

        return () => {
            mounted = false
        }
    }, [])

    var commentHeader = '';
    if (comments) {
        if (comments.length > 1) {
            commentHeader = `all ${comments.length} Comments`;
        } else {
            commentHeader = `1 Comment`;
        }
    } else {
        commentHeader = 'No comments';
    }

    return (
        <div> {loading && comments ? <div>loading</div> :
        <>
            {/* <Post /> */}
            < div >
                <h4>
                    {commentHeader}
                </h4>
                <hr />
            </div >
            {console.log(comments)}
            <CommentForm />
            { nestComments(comments).map(comment => <Comment comment={comment} />)}
        </>}
        </div>
    )
}

// function mapStateToProps(state) {
//     return { comments: state.comments }
// }
// connect(CommentContainer)

export default CommentContainer