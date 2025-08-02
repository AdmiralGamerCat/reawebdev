"use strict";

function createElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.id) { element.id = options.id };

    if (options.class) { element.className = options.class };

    if (options.text) { element.textContent = options.text };

    if (Array.isArray(options.children) && options.children.length > 0) {
        let childElement;
        options.children.forEach((child) => {
            if (child instanceof HTMLElement) {
                childElement = child;
            } else {
                childElement = createElement(child.tag, child);
            }

            element.appendChild(childElement);
        })
    }

    return element;
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typewriter(element, text, letterDelay = 25) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await delay(letterDelay);
    }
}

async function addMsgs(msgs, element, typewriterEffect = false, msgDelay = 100, loadTime = 2200) {
    for (let i = 0; i < msgs.length; i++) {
        let msgElement;

        if (msgs[i] === "br") {
            msgElement = document.createElement("br");
            element.appendChild(msgElement);
            continue;
        }

        msgElement = document.createElement("p");

        element.appendChild(msgElement);

        if (typewriterEffect) {
            await typewriter(msgElement, msgs[i]);
        } else {
            msgElement.textContent = msgs[i];
        }

        if (msgElement.textContent.includes("...")) {
            msgElement.textContent = msgElement.textContent.slice(0, -3);

            const dotSpan = document.createElement("span");
            let dotCount = 0;
            const maxDots = 3;

            msgElement.appendChild(dotSpan);

            const interval = setInterval(() => {
                dotCount = (dotCount + 1) % (maxDots + 1);
                dotSpan.textContent = ".".repeat(dotCount);
            }, 200);

            await delay(loadTime);
            clearInterval(interval);
            dotSpan.remove();
        }

        await delay(msgDelay);
    }
}

// window functions
function closeWindow(eventOrElement) {
    let window;

    if (eventOrElement instanceof Event) {
        window = eventOrElement.target.closest(".window");
    } else {
        window = eventOrElement;
    }

    if (!window) return;

    window.classList.add("hidden");

    window.addEventListener("transitionend", () => {
        window.remove();
    })
}

function fullscreenWindowSwitch(eventOrElement) {
    let window;

    if (eventOrElement instanceof Event) {
        window = eventOrElement.target.closest(".window");
    } else {
        window = eventOrElement;
    }

    const fullscreenBtnIcon = window.querySelector(".max-restore-btn .btn-icon");

    if (fullscreenBtnIcon.className.includes("fa-window-maximize")) {
        window.classList.add("fullscreen");
        fullscreenBtnIcon.classList.replace("fa-window-maximize", "fa-window-restore");
    } else {
        window.classList.remove("fullscreen");
        fullscreenBtnIcon.classList.replace("fa-window-restore", "fa-window-maximize");
    }
}

function addWindow(template, parent, close = false, fullscreen) {
    const window = createElement(template.tag, template);
    parent.appendChild(window);

    if (close) {
        const allCloseBtns = window.querySelectorAll(".close-btn");

        allCloseBtns.forEach((closeBtn) => {
            closeBtn.addEventListener("click", closeWindow);
        })
    }

    if (fullscreen) {
        window.querySelector(".max-restore-btn").addEventListener("click", fullscreenWindowSwitch);
    }

    // END
    requestAnimationFrame(() => { window.classList.remove("hidden") });
    return window;
}

function addWindowTab(window, template, id, title, icon) {
    const tabsContainer = window.querySelector(".tabs-container");
    const contentContainer = window.querySelector(".content-container");

    // tab
    const tab = createElement(template.tag, template);
    const tabTitle = tab.querySelector(".tab-title");
    const tabIcon = tab.querySelector(".tab-icon");

    tab.id = id;
    if (title) { tabTitle.textContent = title };
    if (icon) { tabIcon.className = `tab-icon ${icon}` };

    tabsContainer.appendChild(tab);
    requestAnimationFrame(() => { tab.classList.remove("hidden") });

    // tab content
    const tabContent = document.createElement("div");
    tabContent.className = "tab-content";
    tabContent.id = `${id}TabContent`;

    contentContainer.appendChild(tabContent)

    function updateCurrentTab(currentTab) {
        const allTabs = tabsContainer.querySelectorAll(".window-tab");
        const allTabContents = contentContainer.querySelectorAll(".tab-content");

        // hide all tabs / tab content's
        allTabs.forEach((tab) => {
            if (tab.classList.contains("current")) {
                tab.classList.remove("current");
            }
        })

        allTabContents.forEach((tabContent) => {
            if (tabContent.classList.contains("current")) {
                tabContent.classList.remove("current");
            }
        })

        // show current tab / tab content
        currentTab.classList.add("current");

        contentContainer.querySelector(`#${currentTab.id}TabContent`).classList.add("current");
    }

    updateCurrentTab(tab);

    tab.addEventListener("click", () => { updateCurrentTab(tab) });
}

export const functions = {
    createElement,
    delay,
    typewriter,
    addMsgs,
    addWindow,
    addWindowTab,
    closeWindow
}