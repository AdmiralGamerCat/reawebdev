"use strict";

const container = document.querySelector("#container");
import { templates } from "./templates.js";
import { functions } from "./functions.js";

async function startAnimation() {
    const startWindow = functions.addWindow(templates.window, container,  true, true);

    functions.addWindowTab(startWindow, templates.windowTab, "firstTab", "first tab", "fa-solid fa-briefcase");
    functions.addWindowTab(startWindow, templates.windowTab, "secondTab", "second tab", "fa-solid fa-suitcase");
    functions.addWindowTab(startWindow, templates.windowTab, "thirdTab", "third tab", "fa-solid fa-terminal");
}

window.addEventListener("load", startAnimation);

const loadingMsgs = [
    "*Warning: This terminal is not dangerous.*",
    "Initializing...",
    "Checking for updates...",
    "No new updates found.",
    "Loading projects...",
    "Successfully loaded all projects.",
    "Starting portfolio.exe..."
]

const initialMsgs = [
    "Hidde Aalders Portfolio [Version 1.0]",
    "(c) Hidde Aalders. All rights reserved.",
    "br"
]