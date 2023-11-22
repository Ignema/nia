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
    try {
        const res = await fetch('https://api.jikan.moe/v4/recommendations/anime')
        const json = await res.json()
        const anime = json.data[Math.floor(Math.random()*json.data.length)]
        return anime.entry[Math.floor(Math.random()*anime.entry.length)]
    } catch (error) {
        return null
    }
}