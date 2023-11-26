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
if(cachedHistory!=null) history.innerHTML = cachedHistory
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