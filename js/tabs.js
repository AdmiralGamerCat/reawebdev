"use strict";

// elements
const sidebar = document.querySelector("#sidebar");
const sidebarContent = document.querySelector("#sidebar-content");
const tabContentContainer = document.querySelector("#tab-content-container");
const tabsContainer = document.querySelector("#tabs-container");
const explorerButton = document.querySelector("#explorer-button");

let openTabs = []; // [{ id, file }]
let activeTabId = null;

// helper functions
const fetchFiles = async () => {
    const response = await fetch("./content/json/files.json");
    return await response.json();
};

const fetchFileItem = async (id) => {
    const files = await fetchFiles();

    const search = (items) => {
        for (const item of items) {
            if (item.type === "file" && item.id === id) {
                return item;
            }
            if (item.type === "folder" && item.children) {
                const found = search(item.children);
                if (found) return found;
            }
        }
        return null;
    };

    const fileItem = search(files);

    if (!fileItem) {
        console.error(`Failed to fetch file item "${id}".`);
        return null;
    }

    return fileItem;
};

const createElement = (tag, attributes = {}, children = []) => {
    const el = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
        if (key === "class") el.className = value;
        else if (key === "html") el.innerHTML = value;
        else el.setAttribute(key, value);
    }

    children.forEach(child => {
        el.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });

    return el;
};

// sidebar content
const renderSidebarContent = async () => {
    const files = await fetchFiles();
    sidebarContent.innerHTML = "";

    files.forEach(file => sidebarContent.appendChild(createSidebarItem(file)));
};

const createSidebarItem = (item) => {
    if (item.type === "folder") return createFolderElement(item);
    if (item.type === "file") return createFileElement(item);
};

const createFolderElement = (folder) => {
    const folderElement = createElement("div", { class: "folder" });
    const header = createElement(
        "header",
        { class: "folder-header" },
        [
            createElement("img", { class: "icon", src: `./content/icons/${folder.icon}` }),
            folder.title
        ]
    );

    const childrenContainer = createElement("div", { class: "folder-children-container" });

    folder.children.forEach(child => {
        childrenContainer.appendChild(createSidebarItem(child));
    });

    header.addEventListener("click", () => {
        childrenContainer.classList.toggle("open");
    });

    folderElement.appendChild(header);
    folderElement.appendChild(childrenContainer);
    return folderElement;
};

const createFileElement = (file) => {
    const el = createElement(
        "div",
        { class: "file", "data-file-id": file.id },
        [
            createElement("img", { class: "icon", src: `./content/icons/${file.icon}` }),
            file.title
        ]
    );

    el.addEventListener("click", () => openTab(file));

    return el;
};

// tabs
const createTabElement = (file) => {
    const tab = createElement(
        "button",
        { class: "tab hidden", "data-tab-id": file.id },
        [
            createElement("img", { class: "icon", src: `./content/icons/${file.icon}` }),
            file.title,
            createElement(
                "button",
                { class: "close-button" },
                [createElement("img", { class: "icon", src: "./content/icons/close.svg" })]
            )
        ]
    );

    tab.querySelector(".close-button").addEventListener("click", (event) => {
        closeTab(file);
    });

    tab.addEventListener("click", () => {
        switchTab(file.id);
    });

    tabsContainer.appendChild(tab);

    setTimeout(() => tab.classList.remove("hidden"), 10);
};

const switchTab = async (tabId) => {
    activeTabId = tabId;

    [...tabsContainer.children].forEach(tab => {
        tab.classList.toggle("active", tab.dataset.tabId === tabId);
    });

    const fileItem = await fetchFileItem(tabId);
    if (!fileItem) return;

    tabContentContainer.innerHTML = fileItem.content || "<p>No content available.</p>";
};

const openTab = async (file) => {
    const exists = openTabs.find(t => t.id === file.id);

    if (!exists) {
        openTabs.push({ id: file.id, file });
        createTabElement(file);
    }

    switchTab(file.id);
};

const closeTab = (file) => {
    const tabId = file.id;

    const tab = tabsContainer.querySelector(`[data-tab-id="${tabId}"]`);
    if (tab) {
        tab.classList.add("hidden");
        setTimeout(() => tab.remove(), 120);
    }

    openTabs = openTabs.filter(tab => tab.id !== file.id);

    if (activeTabId === tabId) {
        if (openTabs.length > 0) {
            const lastTab = openTabs[openTabs.length - 1];
            switchTab(lastTab.id);
        } else {
            activeTabId = null;
            tabContentContainer.innerHTML = "";
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    explorerButton.addEventListener("click", () => {
        sidebarContent.classList.toggle("open");
        explorerButton.classList.toggle("active");
    });
    renderSidebarContent();
});
