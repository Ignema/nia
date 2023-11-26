const max_limit = 100
const endpoints = {
    "anime": (keyword,limit) => encodeURI(`https://api.animethemes.moe/search?q=${keyword}&fields[search]=anime&include[anime]=animethemes.animethemeentries.videos,animethemes.song,images&page[limit]=${limit}`),
    "themes": (keyword,limit) => encodeURI(`https://api.animethemes.moe/search?q=${keyword}&fields[search]=videos&fields[video]=link&page[limit]=${limit}`)
}

const processAnime = (keyword, process, limit = max_limit) => {
    fetch(endpoints["anime"](keyword,limit))
    .then(res => res.json())
    .then(res => res["search"]["anime"])
    .then(process)
    .catch(err => console.log(err))
}

const getThemes = async (keyword, limit = max_limit) => {
    try {
        const res = await fetch(endpoints["themes"](keyword,limit))
        const json = await res.json()
        return json["search"]["videos"]
    } catch (error) {
        console.log(error)
        return null
    }
}