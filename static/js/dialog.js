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
        radio.value = option.link;
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
    e.preventDefault();
    const formData = new FormData(form);
    const selectedOption = formData.get('choice');
    video.src = selectedOption
    video.load()
    closeDialog();
    return false;
}

form.addEventListener('submit', submitForm);

