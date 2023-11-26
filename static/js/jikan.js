const fetchAnimeById = async id => {
    try {
        const res = await fetch('https://api.jikan.moe/v4/anime/' + id)
        const json = await res.json()
        return json.data
    } catch (error) {
        return null
    }
}

const fetchRandomAnime = async () => {
    let json;
    const random = localStorage.getItem("JIKAN_RANDOM_ANIME_RESPONSE")
    if(random!=null) {
        json = JSON.parse(random)
    } else {
        const res = await fetch('https://api.jikan.moe/v4/recommendations/anime')
        json = await res.json()
        if(res.status==429) return null
        localStorage.setItem("JIKAN_RANDOM_ANIME_RESPONSE", JSON.stringify(json))
    }
    const anime = json.data[Math.floor(Math.random()*json.data.length)]
    return anime.entry[Math.floor(Math.random()*anime.entry.length)]
}

const getAnimeInfo = async (keyword) => {
    try {
        const res = await fetch(encodeURI(`https://api.jikan.moe/v4/anime?q=${keyword}&limit=5`))
        const json = await res.json()
            return json["data"].filter(t => !/season/i.test(t.title))[0]
    } catch (error) {
        console.log(error)
        return null
    }
}