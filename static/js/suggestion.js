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

const tracker = {} // track added event listeners
const history = [] // track added titles

const triggerSuggestion = (suggestion) => {
    search.value = suggestion
    play.click()
}

const refreshSuggestions = async () => {
    // Loop over each suggestion HTML element
    for(let suggestion of document.getElementsByClassName("suggestion")) {
        // Get random anime
        let anime = null
        do anime = await fetchRandomAnime() 
        while (anime == null || history.includes(anime.title))

        // Setup suggestion elements with data
        suggestion.querySelector(".suggestion-title").innerHTML = anime.title
        suggestion.querySelector(".suggestion-img").src = anime.images.jpg.image_url
        
        // Remove already declared listeners
        if(suggestion.id in tracker)  suggestion.removeEventListener("click", tracker[suggestion.id]) 
        
        const listener = () => triggerSuggestion(anime.title) // Declare click event listener
        tracker[suggestion.id] = listener // Record listener reference to remove in future refresh
        suggestion.addEventListener("click", listener) // Add listener to suggestion element

        history.push(anime.title) // Record added title
    }
}

refreshSuggestions()