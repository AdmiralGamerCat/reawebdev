"use strict";

const container = document.querySelector("#container");
const windowsContainer = container.querySelector("#windows-container");

import { functions } from "./functions.js";
import { templates } from "./templates.js";

async function startAnimation() {
    const cmdWindow = functions.addWindow(templates.window, "Command Prompt", "fa-terminal", true, true)

    const cmdWindowContentContainer = cmdWindow.querySelector(".window-content-container");

    const initialMsgs = [
        "Hidde Aalders Portfolio [Version 1.0]",
        "(c) Hidde Aalders. All rights reserved",
        "br"
    ]

    functions.addMsgs(cmdWindowContentContainer, initialMsgs);

    const loadingMsgs = [
        "*Warning: This terminal is not dangerous.*",
        "Initializing...",
        "Checking for updates...",
        "No new updates found.",
        "Loading projects...",
        "Succesfully loaded all projects.",
        "starting portfolio.exe..."
    ]

    await functions.delay(10);

    await functions.addMsgs(cmdWindowContentContainer, loadingMsgs, true, 200);

    functions.closeWindow(cmdWindow);
}

window.addEventListener("load", () => {
    startAnimation();
})