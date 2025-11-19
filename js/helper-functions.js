"use strict";

// helper functions
export const createElement = (tag, attributes = {}, children = []) => {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
        if (key === "class") element.className = value;
        else if (key === "html") element.innerHTML = value;
        else element.setAttribute(key, value);
    }

    children.forEach(child => {
        element.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    })

    return element;
};

export const fetchFiles = async () => {
    const response = await fetch("./content/json/files.json");
    return await response.json();
};

export const fetchFile = async (fileId) => {
    const files = await fetchFiles();

    const search = (items) => {
        for (const item of items) {
            if (item.type === "file" && item.id === fileId) {
                return item;
            };
            if (item.type === "folder" && item.children) {
                const foundFile = search(item.children);
                if (foundFile) return foundFile;
            }
        }
        return null;
    };

    const file = search(files);

    if (!file) {
        console.error(`Failed to fetch file "${fileId}".`);
        return null;
    }

    return file;
};