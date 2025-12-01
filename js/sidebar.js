"use strict";

import { createElement, fetchFiles } from "./helper-functions.js";
import { openTab } from "./tab-system.js";
import { getFolderState, setFolderState } from "./state-manager.js";

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
        { class: "folder-header", "data-folder-id": folder.id },
        [
            createElement("img", { class: "icon", src: `./content/icons/${folder.icon}` }),
            folder.title
        ]
    );

    const childrenContainer = createElement("div", { class: "folder-children-container" });
    folder.children.forEach(child => childrenContainer.appendChild(createSidebarItem(child)));

    // --- Restore folder state without animation ---
    const isOpen = getFolderState(folder.id);
    if (isOpen) {
        childrenContainer.classList.add("open");
        header.setAttribute("data-open", "true");
        childrenContainer.style.maxHeight = childrenContainer.scrollHeight + "px";
        // Remove max-height after a tick to prevent transition issues
        setTimeout(() => {
            childrenContainer.style.maxHeight = "";
        });
    }

    header.addEventListener("click", () => {
        const isCurrentlyOpen = childrenContainer.classList.contains("open");
        header.setAttribute("data-open", !isCurrentlyOpen);
        const height = childrenContainer.scrollHeight;

        if (isCurrentlyOpen) {
            // CLOSE
            childrenContainer.style.maxHeight = height + "px"; // current height
            childrenContainer.offsetHeight; // force reflow
            childrenContainer.style.transition = "max-height 0.3s ease";
            childrenContainer.style.maxHeight = "0";

            childrenContainer.addEventListener(
                "transitionend",
                function handler(e) {
                    if (e.target !== childrenContainer) return;
                    childrenContainer.removeEventListener("transitionend", handler);
                    childrenContainer.classList.remove("open");
                    childrenContainer.style.transition = "";
                    childrenContainer.style.maxHeight = "";
                }
            );
        } else {
            // OPEN
            childrenContainer.classList.add("open");
            childrenContainer.style.maxHeight = "0";
            childrenContainer.offsetHeight; // force reflow
            childrenContainer.style.transition = "max-height 0.3s ease";
            childrenContainer.style.maxHeight = height + "px";

            childrenContainer.addEventListener(
                "transitionend",
                function handler(e) {
                    if (e.target !== childrenContainer) return;
                    childrenContainer.removeEventListener("transitionend", handler);
                    childrenContainer.style.transition = "";
                    childrenContainer.style.maxHeight = "";
                }
            );
        }

        // --- Save folder state ---
        setFolderState(folder.id, !isCurrentlyOpen);
    });

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

export const expandFilePath = (fileId) => {
    const fileElement = document.querySelector(`#sidebar-content .file[data-file-id="${fileId}"]`);
    if (fileElement) {
        let parent = fileElement.parentElement;

        while (parent && parent.id !== "sidebar-content") {
            if (parent.classList.contains("folder-children-container")) {
                parent.classList.add("open");
                const header = parent.previousElementSibling;
                if (header) header.setAttribute("data-open", true);

                parent.style.maxHeight = "";

                const folderElement = parent.previousElementSibling;
                if (folderElement) {
                    const folderId = header.dataset.folderId;
                    setFolderState(folderId, true);
                };
            };

            parent = parent.parentElement;
        };

        sidebarContent.querySelectorAll(".file").forEach(file => file.classList.toggle("active", file.dataset.fileId === fileId));
    };
};