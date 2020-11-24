export const createSubreddit = async(name, about, rules) => {
  const ruleString = rules.join('#')
  const response = await fetch('/api/subreddits/create', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      about,
      rules: ruleString
    })
  });
  console.log(response)
  return await response.json()
}

export const getOneSubreddit = async (name) => {
  const response = await fetch(`/api/subreddits/r/${name}`)
  return await response.json()
}

export const getSubreddits = async () => {
  const response = await fetch('/api/subreddits/all')
  console.log(response)
  return await response.json()
}
