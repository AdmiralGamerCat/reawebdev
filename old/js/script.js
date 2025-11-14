"use strict";

const container = document.querySelector("#container");
import { templates } from "./templates.js";
import { functions } from "./functions.js";

async function portfolio() {
    const portfolioWindow = functions.addWindow(templates.window, container, false, true);
    functions.addWindowTab(portfolioWindow, templates.windowTab, "portfolio", "Portfolio.exe", "fa-solid fa-briefcase");
    const portfolioTabContent = portfolioWindow.querySelector("#portfolioTabContent");
    const portfolioHomeElements = functions.createElement(templates.portfolioHome);
    portfolioHomeElements.forEach(element => portfolioTabContent.appendChild(element));

    // set information

    // error 'handling'
    const allCloseBtns = portfolioWindow.querySelectorAll(".close-btn");
    allCloseBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            functions.closeWindow(portfolioWindow);

            const ErrorContent = functions.createElement(templates.popupErrorContent.tag, templates.popupErrorContent);
            const errorPopup = functions.addPopup(container, templates.popup, "portfolioErrorPopup", "fa-solid fa-warning", "Error Handler", ErrorContent, "An unexpected error has occurred while trying to closing `portfolio.exe`.");

            errorPopup.querySelector(".confirm-btn").addEventListener("click", () => {
                errorPopup.classList.add("hidden");

                setTimeout(() => {
                    errorPopup.remove();
                    portfolio();
                }, 300); // same delay as transition delay
            })
        })
    })
    
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
            setTimeout(() => {
                portfolio();
            }, 300); // same delay as transition delay
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
        await functions.delay(300); // same delay as transition delay
        portfolio();
    }
}

window.addEventListener("load", startAnimation);

// asks for confirmation before linking to external website
document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href^='http']");

    if (!link) return;

    const currentHost = window.location.host;
    const linkHost = new URL(link.href).host;

    if (linkHost !== currentHost) {
        e.preventDefault();

        const confirmed = confirm(`You are about to leave this website and go to:\n${link.href}\n\nContinue?`);

        if (confirmed) {
            window.open(link.href, "_blank");
        }
    }
})