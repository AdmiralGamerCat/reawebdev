"user strict";

// elements
const sidebar = document.querySelector("#sidebar");
const sidebarContent = document.querySelector("#sidebar-content");
const tabContentContainer = document.querySelector("#tab-content-container");
const tabsContainer = document.querySelector("#tabs-container");

let openTabs = [];
let activeTabId = null;

"use strict";

// helper functions
const fetchFiles = async () => {
    const response = await fetch("./content/json/files.json");
    return await response.json();
}

const fetchFileItem = async (id) => {
    const files = await fetchFiles();
    const fileItem = files.find(fileItem => fileItem.id === id);

    if (!fileItem) {
        console.error(`Failed to fetch file item "${id}".`);
        return;
    }

    return fileItem;
}

const createElement = (tag, attributes = {}, children = []) => {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
        if (key === "class") element.className = value;
        else if (key === "html") element.innerHTML = value;
        else if (key === "dataset") {
            value.forEach(dataKey => {
                element.dataset[dataKey] = value[dataKey];
            })
        }
        else element.setAttribute(key, value);
    }

    children.forEach(child => {
        element.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    })

    return element;
}

// const saveState = () => {
//     const state = { openTabs, activeTabId };
//     localStorage.setItem("portfolio-hidde-aalders-state", state);
// }

// sidebar content
const renderSidebarContent = async () => {
    const files = await fetchFiles();
    sidebarContent.innerHTML = "";

    files.forEach(file => {
        sidebarContent.appendChild(createSidebarItem(file));
    });
}

const createSidebarItem = (item) => {
    if (item.type === "folder") {
        return createFolderElement(item);
    } else if (item.type === "file") {
        return createFileElement(item);
    };
}

const createFolderElement = (folder) => {
    const folderElement = createElement("div", { class: "folder" });
    const header = createElement("header", { class: "folder-header" },
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
}

const createFileElement = (file) => {
    const fileElement = createElement("div", { class: "file", "data-file-id": file.id },
        [
            createElement("img", { class: "icon", src: `./content/icons/${file.icon}` }),
            file.title
        ]
    );

    fileElement.addEventListener("click", () => {
        openTab(file.id)
    });

    return fileElement;
}

// tab / page
renderSidebarContent();