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

    tabElement.addEventListener("click", () => switchTab(file.id));
    
    tabElement.querySelector(".close-button").addEventListener("click", (event) => {
        event.stopPropagation();
        closeTab(file);
    });

    tabsContainer.appendChild(tabElement);
    setTimeout(() => tabElement.classList.remove("hidden"), 10);
};

const switchTab = async (tabId) => {
    setActiveTabId(tabId);

    [...tabsContainer.children].forEach(tab => {
        tab.classList.toggle("active", tab.dataset.tabId === tabId);
    });

    const file = await fetchFile(tabId);
    if (!file) return;

    tabContentContainer.innerHTML = file.content || "<p>No content available.</p>";
};

export const openTab = async (file, options = {}) => {
    const { restore = false, force = false } = options;

    const tabsContainer = document.querySelector("#tabs-container");
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

    // If closing the active tab
    if (activeTabId === file.id) {

        // If other tabs exist: switch to the last one
        if (openTabs.length > 0) {
            const lastTab = openTabs[openTabs.length - 1];
            switchTab(lastTab.id);
        } 
        // If no tabs left: clear content
        else {
            setActiveTabId(null);
            tabContentContainer.innerHTML = "";
        }

    }
    // If closing a non-active tab: do nothing.
};
