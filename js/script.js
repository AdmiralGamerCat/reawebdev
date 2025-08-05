"use strict";

const container = document.querySelector("#container");
import { templates } from "./templates.js";
import { functions } from "./functions.js";

async function portfolio() {
    await functions.delay(350);
    const portfolioWindow = functions.addWindow(templates.window, container, false, true);

    portfolioWindow.querySelector(".close-btn").addEventListener("click", () => {
        functions.closeWindow(portfolioWindow);
        const popupContent = functions.createElement(templates.popupErrorContent.tag, templates.popupErrorContent);
        const errorPopup = functions.addPopup(container, templates.popup, "portfolioClosePopup", "fa-solid fa-warning", "Error Handler", popupContent, "An unexpected error occurred while closing `portfolio.exe`.");

        errorPopup.querySelector(".confirm-btn").addEventListener("click", () => {
            errorPopup.classList.add("hidden");

            errorPopup.addEventListener("transitionend", () => {
                errorPopup.remove();
            })

            portfolio();
        });
    })

    functions.addWindowTab(portfolioWindow, templates.windowTab, "portfolio", "Portfolio.exe", "fa-solid fa-briefcase");
    
    requestAnimationFrame(() => { // one for appearing, one for fullscreen
        requestAnimationFrame(() => {
            functions.fullscreenWindowSwitch(portfolioWindow);
        })
    })
}

async function startAnimation() {
    const startWindow = functions.addWindow(templates.window, container,  true, true);
    let startupSkipped = false;

    functions.addWindowTab(startWindow, templates.windowTab, "startup", "startup.exe", "fa-solid fa-terminal");
    const startContentContainer = startWindow.querySelector("#startupTabContent");

    startWindow.querySelectorAll(".close-btn").forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
            startupSkipped = true;
            functions.closeWindow(startWindow);
            portfolio();
        })
    })

    const initialMsgs = [
        "Hidde Aalders Portfolio [Version 1.0]",
        "(c) Hidde Aalders. All rights reserved.",
        "br"
    ]

    await functions.addMsgs(initialMsgs, startContentContainer)

    const loadingMsgs = [
        "*Warning: This terminal is not dangerous.*",
        "br",
        "Close window to skip.",
        "Initializing...",
        "Checking for updates...",
        "No new updates found.",
        "Loading projects...",
        "Successfully loaded all projects.",
        "Starting portfolio.exe..."
    ]

    await functions.addMsgs(loadingMsgs, startContentContainer, true);
    await functions.delay(200);
    
    if (!startupSkipped) {
        functions.closeWindow(startWindow);
        portfolio();
    }
}

window.addEventListener("load", startAnimation);