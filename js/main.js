"user strict";

// elements
const sidebar = document.querySelector("#sidebar");
const sidebarContent = document.querySelector("#sidebar-content");
const tabContentContainer = document.querySelector("#tab-content-container");
const tabsContainer = document.querySelector("#tabs-container");

let openTabs = [];
let activeTabId = null;

"use strict";

const fetchPage = async (pageId) => {
    const response = await fetch("./content/json/pages.json");
    const result = await response.json();

    const page = result.find(page => page.id === pageId);

    if (!page) {
        console.error(`Page with id "${pageId}" not found.`);
        return;
    }

    // console.log("Page found:", page);
    return page;
};

const createElement = (tag, attributes = {}, children = []) => {
    const element = document.createElement(tag);

    for (const key in attributes) {
        const value = attributes[key];

        if (key === "class") element.className = value;
        else if (key === "html") element.innerHTML = value;
        else if (key === "dataset") {
            for (const dataKey in value) {
                element.dataset[dataKey] = value[dataKey];
            }
        }
        else element.setAttribute(key, value);
    }

    children.forEach((child) => {
        element.appendChild(
            typeof child === "string" 
            ? document.createTextNode(child) 
            : child
        );
    });

    return element;
};


const saveState = () => {
    const state = { openTabs, activeTabId };
    localStorage.setItem("portfolio-hidde-aalders-state", JSON.stringify(state));
}

// tab functions
const openPage = async (pageId) => {
    const page = await fetchPage(pageId);
    if (!page) return;

    tabContentContainer.innerHTML = page.content;

    // console.log(`Opened page ${pageId}.`);
}

const createTab = (page) => {
    if (openTabs.includes(page.id)) {
        // console.log(`Tab "${page.id}" already open.`);
        return;
    }

    const tab = createElement("button",
        { class: "tab", "data-id": page.id },
        [
            createElement("img", { class: "icon", src: `./content/icons/${page.icon}` }),
            createElement("span", {}, [ page.title ]),
            createElement("button", { class: "close-tab" },
                [ createElement("img", { class: "icon", src: "./content/icons/close.svg" }) ]
            )
        ]
    )

    tabsContainer.appendChild(tab);

    openTabs.push(page.id);
    // console.log(`Tab "${page.id}" created.`);
}

const switchTab = async (pageId) => {
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    const activeTab = document.querySelector(`[data-id="${pageId}"]`);
    if (activeTab) activeTab.classList.add("active");

    activeTabId = pageId;

    await openPage(pageId);
    // console.log(`Switched to tab "${pageId}"`);
}

const openTab = async (pageId) => {
    const page = await fetchPage(pageId);

    if (!page) return;

    createTab(page);
    await switchTab(page.id);
}

const closeTab = (pageId) => {
    const tab = document.querySelector(`[data-id="${pageId}"]`);
    if (tab) tab.remove();

    openTabs = openTabs.filter(id => id !== pageId);

    if (activeTabId === pageId) {
        const lastOpened = openTabs[openTabs.length - 1];
        if (lastOpened) switchTab(lastOpened)
        else tabContentContainer.innerHTML = "";
    }
}

tabsContainer.addEventListener("click", (event) => {
    const closeButton = event.target.closest(".close-tab");
    if (closeButton) {
        const tab = closeButton.closest(".tab");
        closeTab(tab.dataset.id);
        return;
    }

    const tab = event.target.closest(".tab");
    if (!tab) return;

    switchTab(tab.dataset.id);
})

openTab("welcome");

setTimeout(() => {
    openTab("bye");
}, 1000);