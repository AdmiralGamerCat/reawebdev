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
                            children: [ { tag: "i", class: "btn-icon fa-solid fa-xmark fa-xl" } ]
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
        { tag: "i", class: "fa-solid fa-warning fa" },
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

const portfolioHomeTemplate = [
    {
        tag: "div",
        class: "sidebar",
        children: [
            {
                tag: "div",
                class: "profile",
                children: [
                    { tag: "img", class: "pofile-img", src: "images/guus.png" },
                    {
                        tag: "div",
                        class: "wrapper",
                        children: [
                            { tag: "h3", class: "profile-name", text: "Hidde Aalders" },
                            { tag: "a", class: "github", text: "GitHub", href: "https://github.com/AdmiralGamerCat", target: "_blank" },
                            { tag: "a", class: "linked-in", text: "Linked In", href: "https://www.linkedin.com/in/hidde-aalders-080948366/", target: "_blank" }
                        ]
                    }
                    
                ]
            },
            {
                tag: "ul",
                class: "nav-bar",
                children: [
                    {
                        tag: "li",
                        class: "nav-item",
                        children: [
                            {
                                tag: "a",
                                class: "btn",
                                href: "#home",
                                children: [
                                    { tag: "i", class: "nav-item-icon fa-solid fa-house" },
                                    { tag: "p", class: "nav-item-text", text: "Home" }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "li",
                        class: "nav-item",
                        children: [
                            {
                                tag: "a",
                                class: "btn",
                                href: "#about",
                                children: [
                                    { tag: "i", class: "nav-item-icon fa-solid fa-user" },
                                    { tag: "p", class: "nav-item-text", text: "About" }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "li",
                        class: "nav-item",
                        children: [
                            {
                                tag: "a",
                                class: "btn",
                                href: "#projects",
                                children: [
                                    { tag: "i", class: "nav-item-icon fa-solid fa-folder" },
                                    { tag: "p", class: "nav-item-text", text: "Projects" }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "li",
                        class: "nav-item",
                        children: [
                            {
                                tag: "a",
                                class: "btn",
                                href: "#contact",
                                children: [
                                    { tag: "i", class: "nav-item-icon fa-solid fa-envelope" },
                                    { tag: "p", class: "nav-item-text", text: "Contact" }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "li",
                        class: "nav-item",
                        children: [
                            {
                                tag: "a",
                                class: "btn",
                                href: "#downloads",
                                children: [
                                    { tag: "i", class: "nav-item-icon fa-solid fa-download" },
                                    { tag: "p", class: "nav-item-text", text: "Downloads" }
                                ]
                            }
                        ]
                    }
                ]
            },
            { tag: "input", type: "checkbox", id: "sidebar-checkbox" },
            {
                tag: "label",
                for: "sidebar-checkbox",
                id: "sidebar-checkbox-label",
                children: [
                    { tag: "i", class: "fa-solid fa-arrow-left" }
                ]
            }
        ]
    },
    {
        tag: "div",
        class: "main-content",
        children: [
            {
                tag: "div",
                class: "content-section",
                id: "home",
                children: [
                    { tag: "h1", class: "content-title", text: "Home"},
                ]
            },
            {
                tag: "div",
                class: "content-section",
                id: "About",
                children: [
                    { tag: "h1", class: "content-title", text: "About" }
                ]
            },
            {
                tag: "div",
                class: "content-section",
                id: "projects",
                children: [
                    { tag: "h1", class: "content-title", text: "Projects" }
                ]
            },
            {
                tag: "div",
                class: "content-section",
                id: "contact",
                children: [
                    { tag: "h1", class: "content-title", text: "Contact" }
                ]
            },
            {
                tag: "div",
                class: "content-section",
                id: "downloads",
                children: [
                    { tag: "h1", class: "content-title", text: "Downloads" }
                ]
            }
        ]
    }
]

export const templates = {
    window: windowTemplate,
    windowTab: windowTabTemplate,
    popup: popupTemplate,
    popupErrorContent: popupErrorContentTemplate,
    portfolioHome: portfolioHomeTemplate
}