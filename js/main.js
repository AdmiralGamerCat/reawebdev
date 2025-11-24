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
})