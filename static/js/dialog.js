const dialog = document.getElementById('dialog');
const backdrop = document.getElementById('dialog-backdrop');
const form = document.getElementById('themes-form');
const themes = document.getElementById('themes-container');
const history = document.querySelector("#history > ul")

const openDialog = (options) => {
    themes.innerHTML = '';
    options.forEach((option, index) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'choice';
        radio.value = `${index};${option.link}`;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(` ${option.link.replace(/^.+\/(.+?)\..+$/, "$1").replace(/-/g, " ")}`));
        themes.appendChild(label);
        themes.appendChild(document.createElement('br'));
    });
    backdrop.style.display = "block"
    dialog.showModal();
}

const closeDialog = () => {
    backdrop.style.display = "none"
    dialog.close();
}

const submitForm = async e => {
    e.preventDefault(); // Prevent submission from refreshing the page

    // Extracting values from dialog form
    const formData = new FormData(form);
    const selectedOption = formData.get('choice');
    const [index,link] = selectedOption.split(";") 

    // Update the URL parameters with the provided option
    const params = `?q=${search.value}&t=${parseInt(index)+1}`
    window.history.replaceState("","",encodeURI(window.location.href.replace(/\?.+$/,"")+params))

    // Setting up the video player
    video.src = link
    video.load()

    // Additional page setup
    const info = await getAnimeInfo(search.value)
    document.getElementById("sidebar-image").src = info.images.jpg.large_image_url
    document.getElementById("sidebar-anime").innerText = info.title
    document.getElementById("sidebar-synopsis").innerText = info.synopsis.replace("[Written by MAL Rewrite]","").trim()
    document.getElementById("anime-info").style.display = "flex"

    // Append theme to history
    const current = `<li>
    <div class="history-del">X</div>
    <div class="history-item">
      <p>${info.title}</p>
      <p>${search.value} - ${parseInt(index)+1}</p>
    </div>
    <img class="history-img" src="${info.images.jpg.large_image_url}" alt="">
    </li>`.replace(/(\s+|\n)/g, " ")
    history.innerHTML = current + history.innerHTML.replace(/(\s+|\n)/g, " ").replace(current,"")
    localStorage.setItem("HISTORY",history.innerHTML)
    for(let item of document.querySelectorAll(".history-item")) {
        item.addEventListener("click", () => {
            const [q,t] = item.querySelector("p:nth-child(2)").innerText.split(/\s*-\s*/)
            window.location.href = `?q=${q}&t=${t}`
        })
    }
    for(let item of document.querySelectorAll(".history-del")) {
        item.addEventListener("click", (e) => {
            history.innerHTML = history.innerHTML.replace(/(\s+|\n)/g, " ").replace(e.target.parentNode.outerHTML,"")
            localStorage.setItem("HISTORY",history.innerHTML)
        })
    }

    // Closing dialog
    closeDialog();
    return false;
}

form.addEventListener('submit', submitForm);

