"use strict";

import { createElement, fetchFiles } from "./helper-functions.js";
import { openTab } from "./tab-system.js";

const sidebarContent = document.querySelector("#sidebar-content");

export const renderSidebarContent = async () => {
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

    header.addEventListener("click", () => childrenContainer.classList.toggle("open"));

    folderElement.appendChild(header);
    folderElement.appendChild(childrenContainer);

    return folderElement;
};

const createFileElement = (file) => {
    const fileElement = createElement(
        "div",
        { class: "file", "data-file-id": file.id },
        [
            createElement("img", { class: "icon", src: `./content/icons/${file.icon}` }),
            file.title
        ]
    );

    fileElement.addEventListener("click", () => openTab(file));

    return fileElement;
};