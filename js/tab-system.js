"use strict";

import { createElement, fetchFiles, fetchFile } from "./helper-functions.js";
import {
    getOpenTabs,
    getActiveTabId,
    addOpenTab,
    removeOpenTab,
    setActiveTabId
} from "./state-manager.js";

const tabsContainer = document.querySelector("#tabs-container");
const tabContentContainer = document.querySelector("#tab-content-container");
const sidebarContent = document.querySelector("#sidebar-content");

const createTabElement = (file) => {
    const tabElement = createElement(
        "button",
        { class: "tab hidden", "data-tab-id": file.id },
        [
            createElement("img", { class: "icon", src: `./content/icons/${file.icon}` }),
            file.title,
            createElement(
                "button",
                { class: "close-button" },
                [ createElement("img", { class: "icon", src: "./content/icons/close.svg" }) ]
            )
        ]
    );

    tabElement.addEventListener("click", () => {
        if (getActiveTabId() === file.id) {
            return;
        } else {
            switchTab(file.id);
        }
    });
    
    tabElement.querySelector(".close-button").addEventListener("click", (event) => {
        event.stopPropagation();
        closeTab(file);
    });

    tabsContainer.appendChild(tabElement);
    setTimeout(() => tabElement.classList.remove("hidden"), 10);
};

const switchTab = async (tabId) => {
    setActiveTabId(tabId);

    tabsContainer.querySelectorAll(".tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.tabId === tabId);
    });

    sidebarContent.querySelectorAll(".file").forEach(file => {
        file.classList.toggle("active", file.dataset.fileId === tabId);
    });

    const file = await fetchFile(tabId);
    if (!file) return;

    const response = await fetch(`./content/file-content/${file.content}?v=${Date.now()}`);
    const fileContent = await response.text();

    tabContentContainer.classList.add("switching");

    setTimeout(() => {
        tabContentContainer.innerHTML = fileContent || "<p>No content available.</p>";
        tabContentContainer.dataset.styleId = tabId;

        const iframe = tabContentContainer.querySelector("iframe.content-viewer");

        if (iframe) {
            iframe.addEventListener("load", () => {
                tabContentContainer.classList.remove("switching");
            })
        } else {
            tabContentContainer.classList.remove("switching");
        }
    }, 150);
};

export const openTab = async (file, options = {}) => {
    const { restore = false, force = false } = options;

    const existsInState = getOpenTabs().find(tab => tab.id === file.id);
    const existsInDOM = tabsContainer.querySelector(`[data-tab-id="${file.id}"]`);

    // Add to state only if not restoring
    if (!existsInState && !restore) {
        addOpenTab({ id: file.id });
    }

    // Create DOM only if missing OR forced
    if (!existsInDOM || force) {
        createTabElement(file);
    }

    // Switch tab only on user actions or if forced (like active tab)
    if (!restore || force) {
        await switchTab(file.id);
    }
};


const closeTab = (file) => {
    const tab = tabsContainer.querySelector(`[data-tab-id="${file.id}"]`);

    if (tab) {
        tab.classList.add("hidden");
        setTimeout(() => tab.remove(), 300);
    }

    removeOpenTab(file.id);

    const openTabs = getOpenTabs();
    const activeTabId = getActiveTabId();

    if (activeTabId === file.id) {
        if (openTabs.length > 0) {
            const lastTab = openTabs[openTabs.length - 1];
            switchTab(lastTab.id);
        } 
        else {
            setActiveTabId(null);
            sidebarContent.querySelectorAll(".file").forEach(file => file.classList.remove("active"));
            tabContentContainer.innerHTML = "";
        };
    };
};
