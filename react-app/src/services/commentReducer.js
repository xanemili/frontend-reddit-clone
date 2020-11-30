function reducer(state, action) {
    let { type, item } = action;
    let comments = [...state]
    if (type === "SUBMIT_COMMENT") {
        comments.push(item);
        return comments    
    }

    if (type === "REPLY_COMMENT") {
        let comments = [...state];
        return comments
    }

    if (type === "GET_COMMENT") {
        let new_comments = [...state]
        let new_state = [...item]
        return new_state
    }

    return state;
}

export default reducer