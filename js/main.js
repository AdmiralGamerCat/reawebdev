"use strict";

import { renderSidebarContent } from "./sidebar.js";
import { getOpenTabs, getActiveTabId } from "./state-manager.js";
import { fetchFile } from "./helper-functions.js";
import { openTab } from "./tab-system.js";

async function restoreTabs() {
    const openTabs = getOpenTabs();
    const activeTab = getActiveTabId();

    // 1. Restore all tabs except the active one
    for (const { id } of openTabs) {
        if (id === activeTab) continue;

        const file = await fetchFile(id);
        if (file) {
            // Only create the tab DOM, don't switch
            await openTab(file, { restore: true, force: true });
        }
    }

    // 2. Restore and select the active tab
    if (activeTab) {
        const file = await fetchFile(activeTab);
        if (file) {
            // Create tab DOM (if missing) and switch to it
            await openTab(file, { restore: true, force: true });
        }
    }
}



renderSidebarContent();
restoreTabs();