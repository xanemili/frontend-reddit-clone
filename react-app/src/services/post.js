
export const createTextPost = async(subredditId, title, type, content) => {
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

export const uploadImage = async (data) => {
  console.log('dayta', data)
  const res = await fetch('/api/s3/upload', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // },
    body: data
  })
  return await res
}

export const getPost = async(postId) => {
  const response = await fetch(`/api/posts/${postId}`)
  return await response.json()
}
