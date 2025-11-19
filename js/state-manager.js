"use strict";

const STORAGE_KEY = "portfolio-state-hidde-aalders";

let state = {
    openTabs: [],
    activeTabId: null
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