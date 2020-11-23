export const createSubreddit = async(name, about, rules) => {
  const response = await fetch('/api/subreddits/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      about,
      rules
    })
  });
  console.log(response)
  return await response.json()
}
