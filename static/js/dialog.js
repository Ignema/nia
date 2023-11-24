const dialog = document.getElementById('dialog');
const backdrop = document.getElementById('dialog-backdrop');
const form = document.getElementById('themes-form');
const themes = document.getElementById('themes-container');

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

const submitForm = e => {
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

    // Closing dialog
    closeDialog();
    return false;
}

form.addEventListener('submit', submitForm);

