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
        processThemes(search.value, themes =>  openDialog(themes), 100)
    }
})

const params = new URLSearchParams(window.location.search)
if(params.has("q")) {
    search.value = params.get("q")
    play.click()
}