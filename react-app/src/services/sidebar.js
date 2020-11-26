
const sideContents = async(user) => {
    const response = await fetch(`/api/subreddits/sidebar/${user}`)
    return await response.json()
}

export default sideContents;