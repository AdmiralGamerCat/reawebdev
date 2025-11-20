"use strict";

import { renderSidebarContent } from "./sidebar.js";
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

renderSidebarContent();
restoreTabs();