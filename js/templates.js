"use strict";

const windowTemplate = {
    tag: "div",
    class: "window hidden",
    children: [
        {
            tag: "div",
            class: "title-bar",
            children: [
                { tag: "div", class: "tabs-container" },
                {
                    tag: "div",
                    class: "btns-container",
                    children: [
                        {
                            tag: "button",
                            class: "minimize-btn",
                            children: [ { tag: "i", class: "btn-icon fa-solid fa-window-minimize" } ]
                        },
                        {
                            tag: "button",
                            class: "max-restore-btn",
                            children: [ { tag: "i", class: "btn-icon fa-regular fa-window-maximize" } ]
                        },
                        {
                            tag: "button",
                            class: "close-btn",
                            children: [ { tag: "i", class: "btn-icon fa-solid fa-xmark fa-xl" } ]
                        }
                    ]
                }
            ]
        },
        { tag: "div", class: "content-container" }
    ]
}

const windowTabTemplate = {
    tag: "div",
    class: "window-tab hidden",
    children: [
        { tag: "i", class: "tab-icon fa-solid fa-undef" },
        { tag: "p", class: "tab-title", text: "Default Title" },
        {
            tag: "button",
            class: "close-btn",
            children: [ { tag: "i", class: "btn-icon fa-solid fa-xmark" } ]
        }
    ]
}

export const templates = {
    window: windowTemplate,
    windowTab: windowTabTemplate
}