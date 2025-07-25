"use strict";

const container = document.querySelector("#container");
const windowsContainer = container.querySelector("#windows-container");

import { functions } from "./functions.js";
import { templates } from "./templates.js";

async function openPortfolio() {
    const portfolioWindow = functions.addWindow(templates.window, "Portfolio.exe", "portfolioWindow", "fa-briefcase", true);
    const portfolioContentContainer = portfolioWindow.querySelector(".window-content-container");

    functions.fullscreenWindowSwitch(portfolioWindow);
}

async function introAnimation() {
    let introSkipped = false;

    const cmdWindow = functions.addWindow(templates.window, "Command Prompt", "loadingWindow", "fa-terminal", true, true);
    const cmdWindowContentContainer = cmdWindow.querySelector(".window-content-container");

    cmdWindow.querySelectorAll(".close-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            introSkipped = true;

            openPortfolio();
        })
    })

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

    await functions.delay(10); // prevent messages from going through each other

    await functions.addMsgs(cmdWindowContentContainer, loadingMsgs, true, 200);

    if (!introSkipped) { // don't open the portfolio here too if already openend
        functions.closeWindow(cmdWindow);
        openPortfolio();
    }
}

window.addEventListener("load", () => {
    introAnimation();
})