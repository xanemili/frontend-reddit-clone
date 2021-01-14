export const getComments = async (postId) => {
    const response = await fetch(`/api/comments/post/${postId}`)
    return await response.json()
}
