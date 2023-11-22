const tracker = {} // track added event listeners
const history = [] // track added titles

const triggerSuggestion = (suggestion) => {
    search.value = suggestion
    play.click()
}

const refreshSuggestions = async () => {
    // Loop over each suggestion HTML element
    await Promise.all([...document.getElementsByClassName("suggestion")].map(async (suggestion) => {
        // Reset suggestion element
        suggestion.querySelector(".suggestion-title").innerHTML = "Loading..."
        suggestion.querySelector(".suggestion-img").src = "static/img/spinner.svg"


        // Get random anime
        let anime = null
        let themes = null
        do {
            anime = await fetchRandomAnime() 
            themes = await getThemes(anime.title, 1)
        } while (
            anime == null 
            || history.includes(anime.title) 
            || themes == null 
            || themes.length === 0
        )

        // Setup suggestion elements with data
        suggestion.querySelector(".suggestion-title").innerHTML = anime.title
        suggestion.querySelector(".suggestion-img").src = anime.images.jpg.image_url

        // Animate suggestion element
        suggestion.classList.add("grow-animation")
        suggestion.addEventListener( "animationend",  () => {
            suggestion.classList.remove("grow-animation");    
        });
        
        // Remove already declared listeners
        if(suggestion.id in tracker)  suggestion.removeEventListener("click", tracker[suggestion.id]) 
        
        const listener = () => triggerSuggestion(anime.title) // Declare click event listener
        tracker[suggestion.id] = listener // Record listener reference to remove in future refresh
        suggestion.addEventListener("click", listener) // Add listener to suggestion element

        history.push(anime.title) // Record added title
    }))
}

refreshSuggestions()