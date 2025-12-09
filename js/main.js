"use strict";

import { renderSidebarContent, expandFilePath } from "./sidebar.js";
import { getOpenTabs, getActiveTabId, getTheme, setTheme } from "./state-manager.js";
import { fetchFile } from "./helper-functions.js";
import { openTab, switchTab } from "./tab-system.js";

const restoreTabs = async () => {
    const openTabs = getOpenTabs();
    const activeTabId = getActiveTabId();

    // Restore all tabs in saved order
    for (const { id } of openTabs) {
        const file = await fetchFile(id);
        if (file) {
            await openTab(file, { restore: true });
        }
    }

    // ---- DELAY NECESSARY ----
    // Give DOM time to render tabs before switching
    await new Promise(r => setTimeout(r, 50));

    // If no active tab stored
    if (!activeTabId) return;

    // If active tab no longer exists, fail gracefully
    const exists = document.querySelector(`[data-tab-id="${activeTabId}"]`);
    if (!exists) {
        // Default: last tab in list
        const last = openTabs[openTabs.length - 1];
        if (last) switchTab(last.id);
        return;
    }

    // FINAL ACTION: switch to correct tab
    switchTab(activeTabId);
};

// SET WEBSITE STATE
document.addEventListener("DOMContentLoaded", async () => {
    renderSidebarContent();
    restoreTabs();
    
    if (!getTheme()) setTheme("Dark+");
    document.documentElement.dataset.theme = getTheme();
});

// internal file links
document.addEventListener("click", async (event) => {
    const element = event.target.closest("[data-file-link]");
    if (!element) return;
    event.preventDefault();

    const fileId = element.dataset.fileLink;
    const file = await fetchFile(fileId);
    if (!file) {
        console.warn(`Link points to missing file: ${fileId}`);
        return;
    };

    await openTab(file);
    expandFilePath(fileId);
});

document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='http']");

    if (!link) return;

    const currentHost = window.location.host;
    const linkHost = new URL(link.href).host;

    if (linkHost !== currentHost) {
        event.preventDefault();

        const confirmed = window.confirm(`You're about to leave this website and go to:\n${link.href}\nContinue?`);

        if (confirmed) {
            window.open(link.href, "_blank");
        };
    };
});