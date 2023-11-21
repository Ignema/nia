const plyr = new Plyr("#anime-video", {})
const video = document.getElementById("anime-video")
const search = document.getElementById("anime-search")
const play = document.getElementById("anime-play")

search.addEventListener("keypress", e => {
    if(e.key === "Enter") play.click()
})

play.addEventListener("click", () => {
    if(search.value === "") {
        alert("You didn't provide any value for search!")
    } else {
        fetch(`https://api.animethemes.moe/search?q=${search.value}&fields%5Bsearch%5D=videos&fields%5Bvideo%5D=link&page%5Blimit%5D=100`)
        .then(res => res.json())
        .then(res => openDialog(res["search"]["videos"]))
        .catch(err => console.log(err))
    }
})