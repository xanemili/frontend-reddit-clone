export const createPost = async(subredditId, title, type, content) => {
    // The value of the subredditId being passed in will come from the select field, the value being the subreddit id, the label being the subreddit name
    const response = await fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subredditId,
        title,
        type,
        content
      })
    });
    console.log('response', response)
    return await response.json()
  }


export const getPost = async(postId) => {
  const response = await fetch(`/api/posts/${postId}`)
  return await response.json()
}
