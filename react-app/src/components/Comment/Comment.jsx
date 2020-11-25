import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import moment from 'moment'
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import CommentBox from './CommentBox'
//will refactor css to appropriate file later


function Comment({comment, userid}) {
    const [showChildren, setShowChildren] = useState(true);
// this causes the data to check if there are more "children" comments under
// the current comment. If there are then is recursively renders more of this
// same component below the one we originally called and if not renders nothing
    const nestedComments = (comment.children || []).map(comment => {
        return <Comment key={comment.id} userid ={userid} comment={comment} type="child"/>
    })
    return (
        <>
        <div style={{ "marginLeft": "45px", marginBottom: '10px' }}>
            <div style ={{display:'inline', fontWeight:'bold', fontSize:'large'}}
                onClick={() => setShowChildren(!setShowChildren)}>{showChildren ? '-' : '+'}
                <img src={`https://robohash.org/${comment.userid}.png`} style={{ width: '30px', marginRight: '4px', verticalAlign: 'middle' }} title='' alt=''></img>
                 <span style={{fontWeight:'bold'}}>
                    {comment.userid} •
                 </span>
                <span style={{ fontSize: '10pt' }}>{moment(new Date(comment.createdAt)).format("MM-DD-YY hh:mm a")}</span>
              
            </div>
            {/* this left border is the line that connects the comments on the same level in the thread */}
            {showChildren &&
                <div style={{ "marginTop": "2px", borderLeft: '2px solid #cadbce', marginLeft: '4px', position: 'relative' }}>
                    {/* this next line is the invisible div next to the left border that will collapse the comment thread when clicked */}
                    <div style={{ width: '15px', float: 'left', position: 'absolute', top: '0', bottom: '0' }} onClick={() => { setShowChildren(!showChildren) }} />
                    {/* outputs the comment text in the HTML format in which it was saved. this is the main comment */}
                    <div className="commentDiv" dangerouslySetInnerHTML={{ __html: comment.content }} />
                    {/* display any nested comments */}
                    {nestedComments}
                </div>
            }
        </div>
        </>
    )
}



export default Comment