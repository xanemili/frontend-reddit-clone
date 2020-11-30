import React , {useState} from 'react';
import { connect } from 'react-redux'

const CommentForm = (props) => {
    const [content, setContent] = useState('')
    function handleSubmit(event, props) {
        event.preventDefault();

        let comment = {
            id: new Date(),
            postId: 92,
            content: event.target.body.value,
        }
        // fetch POST api goes here
        fetch('/api/comments/new', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (!res.errors) {
                props.dispatch({ type: 'SUBMIT_COMMENT', item: res })
                // Do some app logic
            }
        })
        // .catch(err =>  /*handle error event*/)

    }
    
    const updateContent = (event) => {
        setContent(event.target.value)
    }

    return (<div className="comment-form">
        <form onSubmit={(event) => handleSubmit(event, props)}>
            <textarea onChange={updateContent} name="body" rows="5" value={content}></textarea>
            <button>save</button>
        </form>

    </div>
    )
}

export default CommentForm