"use strict";

import { templates } from "./templates.js"; // import all templates

const container = document.querySelector("#container");

// create element helper function
function createElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.class) {
        element.className = options.class;
    }

    if (options.text) {
        element.textContent = options.text;
    }

    if (options.children) {
        options.children.forEach(child => {
            let childElement;

            if (child instanceof HTMLElement) {
                childElement = child;
            } else {
                childElement = createElement(child.tag, child);
            }

            element.appendChild(childElement);
        });
    }

    if (options.events) {
        options.events.forEach(({ type, handler }) => {
            element.addEventListener(type, handler);
        })
    }

    return element;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeWriter(element, text, letterDelay = 25) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await delay(letterDelay);
    }
}

async function startupAnimation() {
    const window = createElement(templates.windowTemplate.tag, templates.windowTemplate);

    // add and hide window
    container.appendChild(window);
    window.classList.add("hidden");

    // set contents
    window.classList.add("startupWindow");
    window.querySelector(".window-icon").className = "fa-solid fa-terminal";
    window.querySelector(".window-title").textContent = "Command Prompt";

    const startMsgs = [
        "Hidde Aalders Portfolio [Version 1.0]",
        "(c) Hidde Aalders. All rights reserved.",
    ]

    // add start messages
    startMsgs.forEach(msg => {
        const msgElement = document.createElement("p");
        msgElement.textContent = msg;
        
        window.querySelector(".window-content-container").appendChild(msgElement);
    })

    const brElement = document.createElement("br");

    window.querySelector(".window-content-container").appendChild(brElement);

    window.querySelector(".window-maximize-restore-btn").addEventListener("click", () => {
        window.classList.add("fullscreen");
    })

    await delay(500);

    // show window
    requestAnimationFrame(() => {
        window.classList.remove("hidden");
    })

    const loadingMsgs = [
        "*Warning: This console is not dangerous.*",
        "Initializing...",
        "Checking for updates...",
        "No new updates found.",
        "Loading projects...",
        "Successfully loaded all projects.",
        "Starting Portfolio.exe"
    ]

    for (const msg of loadingMsgs) {
        const msgElement = document.createElement("p");
        window.querySelector(".window-content-container").appendChild(msgElement);
        await typeWriter(msgElement, msg);
        await delay(200);
    }

    await delay(200);

    // window.classList.add("hidden");

    // window.addEventListener("transitionend", () => {
    //     window.remove();
    // })
}

window.addEventListener("load", startupAnimation);