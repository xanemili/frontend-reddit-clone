import React from 'react';
import { connect } from 'react-redux'

const CommentForm = (props) => {

    function sendToDatabase(comment, postid) {

    }
    function handleSubmit(event, props) {
       event.preventDefault();
       let comment = event.target.body.value
       props.dispatch({type: 'SUBMIT_COMMENT', item: comment})
    }

    return (<div>
        <form onSubmit={(event) => handleSubmit(event, props)}>
            <textarea name="body"></textarea>
            <button>Submit</button>
        </form>

    </div>
    )
}

export default connect()(CommentForm) 