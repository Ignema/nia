const main = document.querySelector("main")

// anime info
const sidebar = document.getElementById("sidebar")
const sidebarClose = document.getElementById("sidebar-close")
const info = document.getElementById("anime-info")

info.addEventListener("click", () => {
    if(sidebar.style.display!="" && sidebar.style.display!="none") return
    main.style.opacity = .3
    main.style.pointerEvents = "none"
    historySidebar.style.display = "none"
    sidebar.style.display = "flex"
})


const closeSidebar = () => {
    if(sidebar.style.display!="flex") return
    main.style.opacity = 1
    main.style.pointerEvents = "auto"
    sidebar.style.display = "none"
}
sidebarClose.addEventListener("click", closeSidebar)
document.addEventListener("keyup", e => {
    if(e.key === "Escape") closeSidebar()
})

// history info
const historySidebar = document.getElementById("history")
const historyClose = document.getElementById("history-close")
const historyInfo = document.getElementById("anime-history")
const historyDel = document.getElementById("history-del")

const closeHistory = () => {
    if(historySidebar.style.display!="flex") return
    main.style.opacity = 1
    main.style.pointerEvents = "auto"
    historySidebar.style.display = "none"
}

historyClose.addEventListener("click", closeHistory)
document.addEventListener("keyup", e => {
    if(e.key === "Escape") closeHistory()
})

historyInfo.addEventListener("click", () => {
    if(historySidebar.style.display!="" && historySidebar.style.display!="none") return
    main.style.opacity = .3
    main.style.pointerEvents = "none"
    sidebar.style.display = "none"
    historySidebar.style.display = "flex"
})

const cachedHistory = localStorage.getItem("HISTORY")
if(cachedHistory!=null) {
    history.innerHTML = cachedHistory
    setupHistoryListeners()
}

for(let item of document.querySelectorAll(".history-item")) {
    item.addEventListener("click", () => {
        const [q,t] = item.querySelector("p:nth-child(2)").innerText.split(/\s*-\s*/)
        window.location.href = `?q=${q}&t=${t}`
    })
}

// anime share
document.getElementById("anime-share").addEventListener("click", async () => {
    if(navigator.share) {
        try {
            await navigator.share({
                title: "Nia",
                text: `Listen to ${document.title.replace("Nia: Playing", "").replace("✨","").trim()} on Nia!`,
                url: window.location.href,
            });
            console.log("Shared successfully.")
        } catch (err) {
            console.error("Error sharing", err);
        }
    } else {
        navigator.clipboard.writeText(window.location.href)
        alert("Copied link to clipboard!")
    }
});