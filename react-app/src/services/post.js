export const createPost = async(userId, subredditId, title, type, content) => {
    // The value of the subredditId being passed in will come from the select field, the value being the subreddit id, the label being the subreddit name
    const response = await fetch('/api/post/create/', {
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
    console.log(response)
    return await response.json()
  }
