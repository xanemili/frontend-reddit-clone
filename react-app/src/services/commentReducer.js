function reducer(state, action) {
    let { type, item } = action;
    let comments = [...state]
    if (type === "SUBMIT_COMMENT") {
        comments.push(item);
        return {
            comments
        }
    }

    if (type === "REPLY_COMMENT") {
        // item = {commentObj, parentid}
        let comments = [...state];
        return {
            comments
        }

    }

    if (type === "GET_COMMENT") {
        let new_comments = [...state]
        let new_state = new_comments.concat(item)
        console.log(new_comments, item)
        return new_state
    }

    return state;
}

export default reducer