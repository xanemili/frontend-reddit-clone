export const addUpvote = async (userId, postId) => {
    const response = await fetch(`/api/likes/${userId}/post/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return await response.json()
}

export const addDownvote = async (userId, postId) => {
    const response = await fetch(`/api/dislikes/${userId}/post/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return await response.json()
}

export const removeUpvote = async (userId, postId) => {
    const response = await fetch(`/api/likes/${userId}/post/${postId}`, {
        method: 'DELETE',
        hdeaers: {
            'Content-Type': 'application/json'
        },
    })
    return await response.json()
}

export const removeDownvote = async (userId, postId) => {
    const response = await fetch(`/api/dislikes/${userId}/post/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return await response.json()
}
