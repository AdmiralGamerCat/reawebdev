"use strict";

const container = document.querySelector("#container");
const windowsContainer = container.querySelector("#windows-container");

import { functions } from "./functions.js";
import { templates } from "./templates.js";

window.addEventListener("load", () => {
    const window = functions.createElement(templates.window.tag, templates.window);

    windowsContainer.appendChild(window);
    const contentContainer = window.querySelector(".window-content-container");

    const msgs = [
        "Test message 1.",
        "Test message 2...",
        "Test message 3..",
        "br",
        "Test message 4...",
        "Test message 5."
    ]

    // functions.addMsgs(contentContainer, msgs, true);
    functions.addMsgs(contentContainer, msgs, false, 200);
})