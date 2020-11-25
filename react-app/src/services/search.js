
const searchFetch = async(res) => {
    const response = await fetch(`/api/search/${res}`)
    return await response.json()
}

export default searchFetch;