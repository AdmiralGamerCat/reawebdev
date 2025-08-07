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
        class: "side-bar",
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
                            { tag: "a", clsss: "github", text: "GitHub", href: "https://github.com/AdmiralGamerCat", target: "_blank" },
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
                                tag: "button",
                                class: "nav-btn",
                                href: "#home",
                                children: [
                                    { tag: "i", class: "btn-icon fa-solid fa-house" },
                                    { tag: "p", class: "btn-text", text: "Home" }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "li",
                        class: "nav-item",
                        children: [
                            {
                                tag: "button",
                                class: "nav-btn",
                                href: "#profile",
                                children: [
                                    { tag: "i", class: "btn-icon fa-solid fa-user" },
                                    { tag: "p", class: "btn-text", text: "Profile" }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "li",
                        class: "nav-item",
                        children: [
                            {
                                tag: "button",
                                class: "nav-btn",
                                href: "#projects",
                                children: [
                                    { tag: "i", class: "btn-icon fa-solid fa-folder" },
                                    { tag: "p", class: "btn-text", text: "Projects" }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "li",
                        class: "nav-item",
                        children: [
                            {
                                tag: "button",
                                class: "nav-btn",
                                href: "#contact",
                                children: [
                                    { tag: "i", class: "btn-icon fa-solid fa-envelope" },
                                    { tag: "p", class: "btn-text", text: "Contact" }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "li",
                        class: "nav-item",
                        children: [
                            {
                                tag: "button",
                                class: "nav-btn",
                                href: "#downloads",
                                children: [
                                    { tag: "i", class: "btn-icon fa-solid fa-download" },
                                    { tag: "p", class: "btn-text", text: "Downloads" }
                                ]
                            }
                        ]
                    }
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
                    { tag: "h1", class: "content-title", text: "Home"}
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