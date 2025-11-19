const openPage = async (pageId) => {
    const page = await fetchPage(pageId);
    if (!page) return;

    tabContentContainer.innerHTML = page.content;

    // console.log(`Opened page ${pageId}.`);
}

const createTab = (page) => {
    if (openTabs.includes(page.id)) {
        // console.log(`Tab "${page.id}" already open.`);
        return;
    }

    const tab = createElement("button",
        { class: "tab hidden", "data-tab-id": page.id },
        [
            createElement("img", { class: "icon", src: `./content/icons/${page.icon}` }),
            createElement("span", {}, [ page.title ]),
            createElement("button", { class: "close-tab" },
                [ createElement("img", { class: "icon", src: "./content/icons/close.svg" }) ]
            )
        ]
    )

    tabsContainer.appendChild(tab);
    setTimeout(() => {
        tab.classList.remove("hidden");
    }, 10);

    openTabs.push(page.id);
    // console.log(`Tab "${page.id}" created.`);
}

const switchTab = async (pageId) => {
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    const activeTab = document.querySelector(`[data-tab-id="${pageId}"]`);
    if (activeTab) activeTab.classList.add("active");

    activeTabId = pageId;

    await openPage(pageId);
    // console.log(`Switched to tab "${pageId}"`);
}

const openTab = async (pageId) => {
    const page = await fetchPage(pageId);

    if (!page) return;

    createTab(page);
    await switchTab(page.id);
}

const closeTab = (pageId) => {
    const tab = document.querySelector(`[data-id="${pageId}"]`);
    if (tab) {
        tab.classList.add("hidden");
        setTimeout(() => {
            tab.remove();
        }, 300);
    }

    openTabs = openTabs.filter(id => id !== pageId);

    if (activeTabId === pageId) {
        const lastOpened = openTabs[openTabs.length - 1];
        if (lastOpened) switchTab(lastOpened)
        else tabContentContainer.innerHTML = "";
    }
}

tabsContainer.addEventListener("click", (event) => {
    const closeButton = event.target.closest(".close-tab");
    if (closeButton) {
        const tab = closeButton.closest(".tab");
        closeTab(tab.dataset.id);
        return;
    }

    const tab = event.target.closest(".tab");
    if (!tab) return;

    switchTab(tab.dataset.id);
})

openTab("welcome")