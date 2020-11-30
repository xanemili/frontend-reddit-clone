import React, { useState } from 'react'
import moment from 'moment'
import CommentForm from './CommentForm';


function Comment({ comment, userid, dispatch, postId }) {
    const [showChildren, setShowChildren] = useState(true);
    const [showCommentBox, setCommentBox] = useState(false);
    const [replies, addNewReply] = useState([])

    // this causes the data to check if there are more "children" comments under
    // the current comment. If there are then is recursively renders more of this
    // same component below the one we originally called and if not renders nothing
    const nestedComments = (comment.children || []).map(comment => {
        return <Comment key={comment.id} userid={comment.userid} comment={comment} type="child" dispatch={dispatch} postId={postId}/>
    })

    // function formHandle(event) {
    //     event.preventDefault()
    //     const comment = {
    //         id: "1",
    //         postid: "1", // Get it from the post
    //         userid: "user1", // Logged in user
    //         content: event.target.comment.value,
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //     }

    //     // Send the comment to the API

    //     // Put the comment into the local state
    //     const allReplies = [...replies];
    //     allReplies.push(comment);
    //     addNewReply(allReplies);
    //     console.log("Posting the comment", comment)

    // }

    return (
        <>
            <div style={{ "marginLeft": "45px", marginBottom: '10px' }}>
                <div className="votes">
                    <div
                        className={`arrow up`}
                    />
                    <div
                        className={`arrow down`}
                    />
                    </div>


                    <div className="comment-author">
                        <span onClick={() => setShowChildren(!setShowChildren)}>
                        [{showChildren ? '-' : '+'}]
                        </span>{' '}
                    <span className="author-link">{comment.userid}</span> 1 points, posted {moment(comment.createdAt).fromNow()}
                    </div>
                {/* this left border is the line that connects the comments on the same level in the thread */}
                {showChildren &&
                    <div style={{ "marginTop": "2px", borderLeft: '1px solid #efefef', marginLeft: '4px', position: 'relative' }}>
                        {/* this next line is the invisible div next to the left border that will collapse the comment thread when clicked */}
                        <div style={{ width: '15px', float: 'left', position: 'absolute', top: '0', bottom: '0' }} onClick={() => { setShowChildren(!showChildren) }} />
                        {/* outputs the comment text in the HTML format in which it was saved. this is the main comment */}
                        <div className="commentDiv comment" dangerouslySetInnerHTML={{ __html: comment.content }} />
                        <div className="link-area">
                        <a class="fake-link" onClick={() => setCommentBox(true)}>reply</a>
                        </div>
                        {
                            replies.map(comment => <div class="comment">{comment.content}</div>)
                        }

                        {
                            showCommentBox ?
                            <>
                            <CommentForm dispatch={dispatch} parentId={comment.id} postId={postId}/>
                                {/* // <div className="comment-form" style={{marginLeft: "25px"}}>
                                //     <form onSubmit={(event) => formHandle(event)} >
                                //         <textarea name="comment" rows="5"></textarea>
                                //         <button class="fake-button" type="submit" style={{marginRight: "15px"}}>Save</button>
                                        // { */}
                            {/* // showCommentBox ? */}
                            <button class="fake-button" onClick={() => setCommentBox(false)}>Cancel</button>
                                {/* : null */}
                        {/* // } */}
                                    {/* </form></div>  */}
                                    </>
                                    : null
                                    }

                        {/* display any nested comments */}
                        {nestedComments}

                    </div>
                }
            </div>
        </>
    )
}



export default Comment;
