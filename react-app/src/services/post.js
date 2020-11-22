export const createPost = async(userId, subredditId, title, type, content) => {
    // Before calling this, must make a fetch request to find the subredditId of a subreddit that was selected
    // considered making another fetch request inside of this function passing in the name of the subreddit selected
    // But I think it can be resolved by creating a select field setting the value as the subredditId and the label for the field
    // As the name of the subreddit
    const response = await fetch('/api/post/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        subredditId,
        title,
        type,
        content
      })
    });
    console.log(response)
    return await response.json()
  }
