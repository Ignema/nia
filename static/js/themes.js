const max_limit = 100

const getThemes = async (keyword, limit = max_limit) => {
    try {
        const res = await fetch(`https://api.animethemes.moe/search?q=${keyword}&fields%5Bsearch%5D=videos&fields%5Bvideo%5D=link&page%5Blimit%5D=${limit}`)
        const json = await res.json()
        return json["search"]["videos"]
    } catch (error) {
        console.log(error)
        return null
    }
}

const processThemes = (keyword, process, limit = max_limit) => {
    fetch(`https://api.animethemes.moe/search?q=${keyword}&fields%5Bsearch%5D=videos&fields%5Bvideo%5D=link&page%5Blimit%5D=${limit}`)
    .then(res => res.json())
    .then(res => res["search"]["videos"])
    .then(process)
    .catch(err => console.log(err))
}