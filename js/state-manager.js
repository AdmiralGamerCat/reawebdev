"use strict";

const STORAGE_KEY = "portfolio-state-hidde-aalders";

let state = {
    openTabs: [{ "id": "welcome" }],
    activeTabId: "welcome",
    sidebarFolders: {},
    theme: "Dark+"
};

const savedState = localStorage.getItem(STORAGE_KEY);
if (savedState) {
    try {
        state = JSON.parse(savedState);
    } catch (error) {
        console.error(`Failed to load saved state: ${error}`);
    };
};

const saveState = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

// tabs
export const getOpenTabs = () => state.openTabs;
export const getActiveTabId = () => state.activeTabId;

export const addOpenTab = (tab) => {
    state.openTabs.push(tab);
    saveState();
};

export const removeOpenTab = (id) => {
    state.openTabs = state.openTabs.filter(tab => tab.id !== id);
    saveState();
};

export const setActiveTabId = (id) => {
    state.activeTabId = id;
    saveState();
};

// sidebar
export const setFolderState = (folderId, isOpen) => {
    state.sidebarFolders[folderId] = isOpen;
    saveState();
};

export const getFolderState = (folderId) => {
    return !!state.sidebarFolders[folderId];
};

// theme
export const getTheme = () => state.theme;

export const setTheme = (theme) => {
    state.theme = theme;
    saveState();
}