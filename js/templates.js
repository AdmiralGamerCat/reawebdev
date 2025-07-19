import { functions } from "./functions.js";

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
                    class: "window-tabs-container",
                    children: [
                        {
                            tag: "div",
                            class: "window-tab",
                            children: [
                                {
                                    tag: "span",
                                    class: "fa-stack",
                                    children: [
                                        { tag: "i", class: "fas fa-square fa-stack-2x window-icon-bg" },
                                        { tag: "i", class: "fas fa-notdef fa-stack-1x fa-inverse window-icon" }
                                    ]
                                },
                                { 
                                    tag: "p",
                                    text: "Default Title",
                                    class: "window-title"
                                },
                                { 
                                    tag: "button",
                                    class: "close-btn",
                                    events: [
                                        { type: "click", action: functions.closeWindow }
                                    ],
                                    children: [
                                        { tag: "i", class: "fa-solid fa-xmark fa-xl btn-icon" }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: "div",
                    class: "window-btns-container",
                    children: [
                        {
                            tag: "button",
                            class: "window-minimize-btn",
                            children: [
                                { tag: "i", class: "fa-solid fa-window-minimize btn-icon" }
                            ]
                        },
                        {
                            tag: "button",
                            class: "window-minimize-maximize-btn",
                            children: [
                                { tag: "i", class: "fa-regular fa-window-maximize btn-icon" }
                            ]
                        },
                        {
                            tag: "button",
                            class: "close-btn",
                            events: [
                                { type: "click", action: functions.closeWindow }
                            ],
                            children: [
                                { tag: "i", class: "fa-solid fa-xmark fa-xl btn-icon" }
                            ]
                        }
                    ]
                }
            ]
        },
        { tag: "div", class: "window-content-container" }
    ]
}

export const templates = {
    window: windowTemplate
}