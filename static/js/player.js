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
    if(params.has("t")) {
        const selector = `#themes-container > label:nth-child(${params.get("t") == 1 ? 1 : parseInt(params.get("t"))+1}) > input[type=radio]`
        waitUntilElementExists(selector, radio => {
            radio.click()
            document.querySelector(`#themes-form > button[type="submit"]`).click()

            const interact = document.querySelector(`.page-interact`)
            const p = document.querySelector(`.page-interact > p`)
            p.innerHTML = `Loading...`
            interact.style.display = "flex"
            setTimeout(() => p.innerHTML = `Click anywhere to play <span>${params.get("q")}</span>`, 2000)
            interact.addEventListener("click", () => {
                interact.style.animation = "fade-out 1s forwards";
                setTimeout(() => interact.style.display = "none", 1000)
                plyr.play();
            })
        })
    }
}