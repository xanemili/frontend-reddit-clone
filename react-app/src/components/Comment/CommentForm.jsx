import React from 'react';
import { connect } from 'react-redux'

const CommentForm = (props) => {

    function sendToDatabase(comment, postid) {

    }
    function handleSubmit(event, props) {
        event.preventDefault();

        let comment = {
            id: new Date(),
            postid: "1",
            userid: "user1",
            content: event.target.body.value,
            createdAt: new Date(),
            updatedAt: new Date(),
        }



        props.dispatch({ type: 'SUBMIT_COMMENT', item: comment })

        // // fetch POST api goes here
        // fetch('/api/comment/new', {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(comment)
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         if (res.success) {
        //             // Do some app logic
        //         }
        //     })
        //     .catch(err =>  /*handle error event*/)
    }

    return (<div className="comment-form">
        <form onSubmit={(event) => handleSubmit(event, props)}>
            <textarea name="body" rows="5"></textarea>
            <button>save</button>
        </form>

    </div>
    )
}

export default connect()(CommentForm) 