/* handle the modal */

const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-box");

function openModal() {
    modal.style.visibility = "visible";
    backdrop.style.visibility = "visible";
}

function closeModal() {
    modal.style.visibility = "hidden";
    backdrop.style.visibility = "hidden";
}

closeBtn.addEventListener("click", closeModal);

/* move icons around */

let activeIcon = null;
let offsetX = 0;
let offsetY = 0;
let startX = 0;
let startY = 0;
let isDragging = false;
const DRAG_THRESHOLD = 1;

document.querySelectorAll(".container").forEach((icon) => {
    icon.addEventListener("mousedown", (e) => {
        activeIcon = icon;
        const rect = icon.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        startX = e.clientX;
        startY = e.clientY;
        //isDragging = false;
        icon.style.cursor = "grabbing";
    });

    icon.addEventListener("dblclick", (e) => {
        // only fire click if it was NOT a drag
        if (isDragging) return;
        else {
            console.log("aaaaaa");
            console.log(e);
        }
        if (icon.id === "container-papers") {
            console.log(isDragging);
            openModal();
        }
    });
});

document.addEventListener("mousemove", (e) => {
    if (!activeIcon) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!isDragging) {
        console.log("checking whether dragging");
        if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
            isDragging = true;
            console.log(isDragging);
        } else {
            return;
        }
    }
    const desktop = document.querySelector(".desktop");
    const rect = desktop.getBoundingClientRect();
    const x = e.clientX - rect.left - offsetX;
    const y = e.clientY - rect.top - offsetY;
    if (x > window.innerWidth - 24 - 64 || x <= 0) return;
    if (y > window.innerHeight - 24 - 128 || y <= 0) return;
    activeIcon.style.left = x + "px";
    activeIcon.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
    if (!activeIcon) return;
    //isDragging = false;
    activeIcon.style.cursor = "grab";
    activeIcon = null;
});

/* prevent trever from breaking my website */

window.onresize = () => {
    console.log("resetting icon positions");
    {
        let el = document.getElementById("container-papers");
        if (el) {
            let l = el.getBoundingClientRect().left;
            let t = el.getBoundingClientRect().top;
            if (l > window.innerWidth - 24 - 64) {
                el.style.left = "20px";
                el.style.top = "20px";
            }
        }
    }
    {
        let el = document.getElementById("container-bib");
        if (el) {
            let l = el.getBoundingClientRect().left;
            let t = el.getBoundingClientRect().top;
            if (l > window.innerWidth - 24 - 64) {
                el.style.left = "120px";
                el.style.top = "20px";
            }
        }
    }
    {
        let el = document.getElementById("container-bin");
        if (el) {
            let l = el.getBoundingClientRect().left;
            let t = el.getBoundingClientRect().top;
            if (l > window.innerWidth - 24 - 64) {
                el.style.left = window.innerWidth - 24 - 64 + "px";
            }
        }
    }
};

function resetDrag() {
    if (activeIcon) {
        activeIcon.style.cursor = "grab";
    }
    activeIcon = null;
    console.log("resetting...");
    isDragging = false;
}

document.addEventListener("mouseup", resetDrag);
document.addEventListener("mouseleave", resetDrag);

/* make the clock show the time */

let updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;

    const clock = document.getElementById("clock");
    if (clock) {
        clock.textContent = time;
    }
};

updateClock();
setInterval(updateClock, 1000);
