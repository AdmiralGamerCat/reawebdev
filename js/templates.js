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

const popupTemplate = {
    tag: "div",
    class: "popup hidden",
    children: [
        {
            tag: "div",
            class: "title-bar",
            children: [
                {
                    tag: "div",
                    class: "wrapper",
                    children: [
                        { tag: "i", class: "popup-icon fa-solid fa-notdef" },
                        { tag: "p", class: "popup-title", text: "Default Title" }
                    ]
                },
                {
                    tag: "div",
                    class: "btns-container",
                    children: [
                        {
                            tag: "button",
                            class: "close-btn",
                            children: [ { tag: "i", class: "btn-icon fa-solid fa-xmark" } ]
                        }
                    ]
                }
            ]
        },
        { tag: "div", class: "content-container" }
    ]
}

const popupErrorContentTemplate = {
    tag: "div",
    class: "error-content-container",
    children: [
        { tag: "i", class: "fa-solid fa-warning fa-2xl" },
        {
            tag: "p",
            class: "error-msg",
            text: "An unexpected error occurred."
        },
        {
            tag: "button",
            class: "confirm-btn",
            children: [ { tag: "p", class: "btn-text", text: "OK" } ]
        }
    ]
}

export const templates = {
    window: windowTemplate,
    windowTab: windowTabTemplate,
    popup: popupTemplate,
    popupErrorContent: popupErrorContentTemplate
}