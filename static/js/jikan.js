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