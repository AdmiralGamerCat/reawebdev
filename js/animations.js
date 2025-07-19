import { createElement, addMsgs, delay } from "./functions.js";
import { templates } from "./templates.js";

const container = document.querySelector("#container");

async function startupAnimation() {
    const window = createElement(templates.windowTemplate.tag, templates.windowTemplate);
    container.appendChild(window);
    const windowContentContainer = window.querySelector(".window-content-container");

    // set window attributes
    window.querySelector(".window-icon").className = "fa-solid fa-terminal";
    window.querySelector(".window-title").textContent = "setup.exe";
    window.classList.add("startup-window");
    window.classList.add("hidden");

    requestAnimationFrame(() => {
        window.classList.remove("hidden");
    })

    const initialMsgs = [
        "Hidde Aalders Portfolio [Version 1.0]",
        "(c) Hidde Aalders. All rights reserved.",
        "br"
    ]

    addMsgs(windowContentContainer, initialMsgs, false, 0, 0);

    const loadingMsgs = [
        "*Warning: This terminal is not dangerous.*",
        "Initializing..."
    ];

    await delay(50);

    addMsgs(windowContentContainer, loadingMsgs, true, 25, 200);


}

export {
    startupAnimation
}