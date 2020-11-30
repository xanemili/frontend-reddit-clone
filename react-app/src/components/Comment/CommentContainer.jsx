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
    console.log("commentlist:", commentList)
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

const CommentContainer = ({postId}) => {
    const [loading, setLoading] = useState(true)
    const [comments, dispatch] = useReducer(reducer, [])

    useEffect(() => {
        let mounted = true
        const fetchData = async () => {
            const commentResponse = await fetch(`/api/comments/post/${postId}`)
            const comments = await commentResponse.json();

            console.log(comments)
            if (!comments.errors && mounted) {
                setLoading(false)
                dispatch({ type: 'GET_COMMENT', item: comments.comments })
            }
        }


        fetchData()

        window.scrollTo(0,0)

        return () => {
            mounted = false
        }
    }, [])

    var commentHeader = '';
    if (comments) {
        commentHeader = `${comments.length} Comment(s)`;
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
            <CommentForm dispatch={dispatch} postId={postId}/>
            { nestComments(comments).map(comment => <Comment comment={comment} dispatch={dispatch} postId={postId}/>)}
        </>}
        </div>
    )
}

// function mapStateToProps(state) {
//     return { comments: state.comments }
// }
// connect(CommentContainer)

export default CommentContainer
