async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typewriter(element, text, letterDelay = 25) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await delay(letterDelay);
    }
}

async function addMsgs(msgsParent, msgs, typeWriterEffect = false, msgDelay = 0, loadingTime = 2200) {
    for (const msg of msgs) {
        let msgElement;

        if (msg === "br") {
            msgElement = document.createElement("br");
        } else {
            msgElement = document.createElement("p");
        }

        msgsParent.appendChild(msgElement);

        if (typeWriterEffect) {
            await typewriter(msgElement, msg);
        } else {
            msgElement.textContent = msg;
        }

        if (msgElement.textContent.includes("...")) {
            msgElement.textContent = msgElement.textContent.slice(0, -3);

            const dotSpan = document.createElement("span");
            msgElement.appendChild(dotSpan);

            let dotCount = 0;
            const maxDots = 3;

            const interval = setInterval(() => {
                dotCount = (dotCount + 1) % (maxDots + 1);
                dotSpan.textContent = ".".repeat(dotCount);
            }, 200);

            await delay(loadingTime); // ... loading animation duration

            clearInterval(interval);
            dotSpan.remove();
        }

        await delay(msgDelay);
    }
}

function createElement(tag,  options = {}) {
    const element = document.createElement(tag);

    if (options.class) {
        element.className = options.class;
    }

    if (options.text) {
        element.textContent = options.text;
    }

    if (options.children) {
        options.children.forEach((child) => {
            let childElement;

            if (child instanceof HTMLElement) {
                childElement = child;
            } else {
                childElement = createElement(child.tag, child);
            }

            element.appendChild(childElement);
        })
    }

    if (options.events) {
        options.events.forEach((event) => {
            element.addEventListener(event.type, (e) => {
                event.action(e);
            })
        })
    }

    return element
}

// window functions
function fullscreenWindowSwitch(eOrElement) {
    let window;

    if (eOrElement instanceof Event) {
        window = eOrElement.target.closest(".window");
    } else {
        window = eOrElement
    }

    const fullscreenBtnIcon = window.querySelector(".fullscreen-btn").querySelector(".btn-icon");

    if (fullscreenBtnIcon.className.includes("fa-window-maximize")) {
        window.classList.add("fullscreen");
        fullscreenBtnIcon.classList.replace("fa-window-maximize", "fa-window-restore");
    } else {
        window.classList.remove("fullscreen");
        fullscreenBtnIcon.classList.replace("fa-window-restore", "fa-window-maximize");
    }
}

function closeWindow(eOrElement) {
    let window;

    if (eOrElement instanceof Event) {
        window = eOrElement.target.closest(".window");
    } else {
        window = eOrElement;
    }

    if (!window) return;

    window.classList.add("hidden");

    window.addEventListener("transitionend", () => {
        window.remove();
    })
}

function addWindow(template, title, id, icon, fullscreen = false, close = false, content = "") {
    const windowsContainer = document.querySelector("#windows-container");
    const window = createElement(template.tag, template);

    windowsContainer.appendChild(window);

    if (title) {
        window.querySelector(".window-title").textContent = title;
    }

    if (id) {
        window.id = id;
    }

    if (icon) {
        window.querySelector(".window-icon").classList.replace("fa-notdef", icon);
    }

    if (fullscreen) {
        window.querySelector(".fullscreen-btn").addEventListener("click", fullscreenWindowSwitch);
    }

    if (close) {
        window.querySelectorAll(".close-btn").forEach((btn) => {
            btn.addEventListener("click", closeWindow);
        })
    }

    if (content !== "") {
        window.querySelector(".window-content-container").appendChild(content);
    }

    requestAnimationFrame(() => { window.classList.remove("hidden") });
    return window;
}

export const functions = {
    delay,
    typewriter,
    addMsgs,
    createElement,
    fullscreenWindowSwitch,
    closeWindow,
    addWindow
}