import React from 'react';

class CommentBox extends React.Component {
    constructor() {
        super();

        this.state = {
            comments: [
                {},
                {},
            ]
        };
    }

    render() {
        const comments = this._getComments();
        let commentNodes;


        if (this.state.showComments) {

            commentNodes = <div className="comment-list">{comments}</div>;
        }

        return (
            <div className="comment-box">
                <CommentForm addComment={this._addComment.bind(this)} />
                <h3>Comments</h3>
                <h4 className="comment-count">
                    {this._getCommentsTitle(comments.length)}
                </h4>
            </div>
        );
    } // end render

    _addComment(author, body) {
        const comment = {
            id: this.state.comments.length + 1,
            author,
            body
        };
        this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
    }

    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });
    }

    _getComments() {
        return this.state.comments.map((comment) => {
        });
    }

    _getCommentsTitle(commentCount) {
        if (commentCount === 0) {
            return 'No comments yet';
        } else if (commentCount === 1) {
            return "1 comment";
        } else {
            return `${commentCount} comments`;
        }
    }
} // end CommentBox component

class CommentForm extends React.Component {
    render() {
        return (
            <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                <div className="comment-form-fields">
               
                    <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></textarea>
                </div>
                <div className="comment-form-actions">
                    <button type="submit">SAVE</button>
                </div>
            </form>
        );
    } // end render

    _handleSubmit(event) {
        event.preventDefault();   // prevents page from reloading on submit
        let author = this._author;
        let body = this._body;
        this.props.addComment(author.value, body.value);
    }
} // end CommentForm component

export default CommentBox