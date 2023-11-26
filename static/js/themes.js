const max_limit = 100
const themes_endpoint = (keyword,limit) => encodeURI(`https://api.animethemes.moe/search?q=${keyword}&fields[search]=videos&fields[video]=link&page[limit]=${limit}`)

const getThemes = async (keyword, limit = max_limit) => {
    try {
        const res = await fetch(themes_endpoint(keyword,limit))
        const json = await res.json()
        return json["search"]["videos"]
    } catch (error) {
        console.log(error)
        return null
    }
}

const processThemes = (keyword, process, limit = max_limit) => {
    fetch(themes_endpoint(keyword,limit))
    .then(res => res.json())
    .then(res => res["search"]["videos"])
    .then(process)
    .catch(err => console.log(err))
}