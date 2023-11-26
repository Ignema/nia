const dialog = document.getElementById('dialog');
const backdrop = document.getElementById('dialog-backdrop');
const form = document.getElementById('themes-form');
const themes = document.getElementById('themes-container');
const history = document.querySelector("#history > ul")
const submit = document.querySelector("#form-buttons button:nth-child(1)")
const seperator = "<NIA-DIALOG-THEME-SEPERATOR>"

const setupLabelListeners = () => {
    const labels = document.querySelectorAll("#themes-container > label")
    labels.forEach(label => {
        label.addEventListener("click", e => {
            if(e.target.type==="radio") return
            const isChecked = label.classList.contains("theme-label-clicked")
            labels.forEach(l => {
                l.querySelector("input").checked = false
                l.classList.remove("theme-label-clicked")
            })
            if(!isChecked) label.classList.add("theme-label-clicked")
            label.querySelector("input").checked = !isChecked
            if(isChecked) {
                submit.disabled = true
                submit.classList.add("disabled-dialog-submit") 
            } else {
                submit.disabled = false
                submit.classList.remove("disabled-dialog-submit")
            } 
        })
    })
}

const openDialog = (anime) => {
    let index = 0
    themes.innerHTML = ''
    anime.forEach((show) => {
        show["animethemes"].forEach(theme => {
            theme["animethemeentries"][0]["videos"].forEach(video => {
                const label = document.createElement('label')
                const radio = document.createElement('input')
                radio.type = 'radio'
                radio.name = 'choice'
                radio.value = [index, JSON.stringify(show), video.link, theme["slug"]].join(seperator)
                const title = document.createElement('span')
                title.innerHTML = (` <strong>${show["name"]} ${theme["slug"]}:</strong> ${theme["song"]["title"]} (${video["resolution"]}p)${video["lyrics"]=="true"?" (lyrics)":""}`)
                label.appendChild(radio)
                label.appendChild(title)
                themes.appendChild(label)
                themes.appendChild(document.createElement('br'))
                index+=1
            })
        })
    });
    backdrop.style.display = "block"
    setupLabelListeners()
    dialog.showModal()
}

const closeDialog = () => {
    backdrop.style.display = "none"
    submit.disabled = true
    submit.classList.add("disabled-dialog-submit") 
    dialog.close();
}

const setupHistoryListeners = () => {
    for(let item of document.querySelectorAll(".history-del")) {
        item.addEventListener("click", e => {
            history.innerHTML = history.innerHTML.replace(/(\s+|\n)/g, " ").replace(e.target.parentNode.outerHTML.replace(/(\s+|\n)/g, " "),"")
            setupHistoryListeners()
            localStorage.setItem("HISTORY", history.innerHTML)
        })
    }
}

document.querySelector(".history-del-all").addEventListener("click", () => {
    history.innerHTML = ""
    localStorage.removeItem("HISTORY")
})

const submitForm = async e => {
    e.preventDefault(); // Prevent submission from refreshing the page

    // Extracting values from dialog form
    const formData = new FormData(form);
    const selectedOption = formData.get('choice');
    const [index,show,link,type] = selectedOption.split(seperator) 
    const anime = JSON.parse(show)

    // Update the URL parameters with the provided option
    const params = `?q=${search.value}&t=${parseInt(index)+1}`
    window.history.replaceState("","",encodeURI(window.location.href.replace(/\?.+$/,"")+params))

    // Setting up the video player
    video.src = link
    video.load()

    // Additional page setup
    document.getElementById("sidebar-image").src = anime.images[0].link
    document.getElementById("sidebar-anime").innerText = anime.name
    document.getElementById("sidebar-season").innerText = `${anime.season} - ${anime.year}`
    document.getElementById("sidebar-synopsis").innerHTML = anime.synopsis.replace(/\(Source:.+?\)/,"").trim()
    document.getElementById("anime-info").style.display = "flex"

    // Append theme to history
    const current = `<li>
    <img class="history-img" src="${anime.images[0].link}" alt="">
    <div class="history-item">
      <p>${anime.name} ${type}</p>
      <p>${search.value} - ${parseInt(index)+1}</p>
    </div>
    <div class="history-del">X</div>
    </li>`.replace(/(\s+|\n)/g, " ")
    history.innerHTML = current + history.innerHTML.replace(/(\s+|\n)/g, " ").replace(current,"")
    localStorage.setItem("HISTORY",history.innerHTML)
    for(let item of document.querySelectorAll(".history-item")) {
        item.addEventListener("click", () => {
            const [q,t] = item.querySelector("p:nth-child(2)").innerText.split(/\s*-\s*/)
            window.location.href = `?q=${q}&t=${t}`
        })
    }
    setupHistoryListeners()

    // Closing dialog
    closeDialog();
    return false;
}

form.addEventListener('submit', submitForm);

