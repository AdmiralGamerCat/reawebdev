"use strict";

import { renderSidebarContent, expandFilePath } from "./sidebar.js";
import { getOpenTabs, getActiveTabId } from "./state-manager.js";
import { fetchFile } from "./helper-functions.js";
import { openTab } from "./tab-system.js";

async function restoreTabs() {
    const openTabs = getOpenTabs();
    const activeTab = getActiveTabId();

    for (const { id } of openTabs) {
        if (id === activeTab) continue;

        const file = await fetchFile(id);
        if (file) {
            await openTab(file, { restore: true, force: true });
        };
    };

    if (activeTab) {
        const file = await fetchFile(activeTab);
        if (file) {
            await openTab(file, { restore: true, force: true });
        };
    };
};

document.addEventListener("DOMContentLoaded", async () => {
    renderSidebarContent();
    restoreTabs();
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
        }
    }
})