const waitUntilElementExists = (selector, callback) => {
    const el = document.querySelector(selector);
    if (el) return callback(el);
    setTimeout(() => waitUntilElementExists(selector, callback), 500);
}