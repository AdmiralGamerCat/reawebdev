const windowTemplate = {
    tag: "div",
    class: "window",
    children: [
        {
            tag: "div",
            class: "window-title-bar",
            children: [
                {
                    tag: "div",
                    class: "window-tab-bar",
                    children: [
                        {
                            tag: "div",
                            class: "window-tab",
                            children: [
                                { tag: "i", class: "window-icon fa-solid fa-triangle-exclamation" },
                                { tag: "p", class: "window-title", text: "default title" },
                                { tag: "button", class: "window-close-btn", children: [ { tag: "i", class: "fa-solid fa-xmark close-btn-icon" } ] }
                            ]
                        }
                    ]
                },
                {
                    tag: "div",
                    class: "window-btns-container",
                    children: [
                        { tag: "button", class: "window-minimize-btn", children: [ { tag: "i", class: "fa-solid fa-window-minimize" } ] },
                        { tag: "button", class: "window-maximize-restore-btn", children: [ { tag: "i", class: "fa-regular fa-window-maximize" } ] },
                        { tag: "button", class: "window-close-btn", children: [ { tag: "i", class: "fa-solid fa-xmark fa-xl" } ] }
                    ]
                }
            ]
        },
        { tag: "div", class: "window-content-container" }
    ]
}

export const templates = {
    windowTemplate: windowTemplate
}