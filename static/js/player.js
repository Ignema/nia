const plyr = new Plyr("#anime-video")
const video = document.getElementById("anime-video")
const search = document.getElementById("anime-search")
const clear = document.getElementById("anime-search-clear")
const play = document.getElementById("anime-play")

search.addEventListener("keypress", e => {
    if(e.key === "Enter") play.click()
})

search.addEventListener("input", e => {
    if(e.target.value!="") clear.style.display = "block"
    else clear.style.display = "none"
})

clear.addEventListener("click", () => {
    search.value = ""
    clear.style.display = "none"
})

play.addEventListener("click", () => {
    if(search.value === "") {
        alert("You didn't provide any value for search!")
    } else {
        processAnime(search.value, anime => openDialog(anime), 5)
    }
})

const params = new URLSearchParams(window.location.search)
if(params.has("q")) {
    search.value = params.get("q")
    if(search.value!="") clear.style.display = "block"
    play.click()
    if(params.has("t")) {
        const selector = `#themes-container > label:nth-child(${parseInt(params.get("t"))*2-1}) > input[type=radio]`
        waitUntilElementExists(selector, radio => {
            radio.checked = true // Select provided anime from params

            // Submit theme form
            const submit = document.querySelector(`#themes-form button[type="submit"]`)
            submit.disabled = false
            submit.classList.remove("disabled-dialog-submit")
            submit.click()
            submit.disabled = true
            submit.classList.add("disabled-dialog-submit")

            // Setup Interact Screen
            const interact = document.querySelector(`.page-interact`)
            const p = document.querySelector(`.page-interact > p`)
            p.innerHTML = `Loading...`
            interact.style.display = "flex"
            setTimeout(() => p.innerHTML = `Click anywhere to play <span>${document.title.replace("Nia: Playing", "").replace("✨","").trim()}</span>`, 2000)
            interact.addEventListener("click", () => {
                interact.style.animation = "fade-out 1s forwards";
                setTimeout(() => interact.style.display = "none", 1000)
                plyr.play();
            })
        })
    }
}