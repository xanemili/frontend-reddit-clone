import { createStore } from 'redux';

const defaultState = {

    comments : [
        {
            id: "1",
            postid: "1",
            userid: "user1",
            content: "this is user1",
            createdAt: "2017-05-25 17:39:49.554808-05",
            updatedAt: "2017-05-25 17:39:49.554808-05",
            children: [
                {
                    id: "2",
                    postid: "1",
                    userid: "user2",
                    content: "user2 responding to user1's comment",
                    createdAt: "2020-11-23 12:59:55",
                    updatedAt: "2020-11-23 12:59:55",
                    children: [
                        {
                            id: "3",
                            postid: "1",
                            userid: "user1",
                            content: "user1 responding to user2's nested comment",
                            createdAt: "2020-11-23 13:59:55",
                            updatedAt: "2020-11-23 13:59:55",
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: "4",
            postid: "1",
            userid: "user1",
            content: "this is user1",
            createdAt: "2020-11-23 11:59:55",
            updatedAt: "2020-11-23 11:59:55",
            children: [
                {
                    id: "5",
                    postid: "1",
                    userid: "user2",
                    content: "user2 responding to user1's comment",
                    createdAt: "2020-11-23 12:59:55",
                    updatedAt: "2020-11-23 12:59:55",
                    children: [
                        {
                            id: "6",
                            postid: "1",
                            userid: "user1",
                            content: "user1 responding to user2's nested comment",
                            createdAt: "2020-11-23 13:59:55",
                            updatedAt: "2020-11-23 13:59:55",
                            children: []
                        }
                    ]
                }
            ]
        },
    ]
}

function reducer(state, action) {
    let { type, item } = action;
    let comments = [...state.comments]
    if(type === "SUBMIT_COMMENT") {
        comments.push(item);
        return {
            comments
        }
    }
    return state;
}

const store = createStore(reducer, defaultState)

export default store