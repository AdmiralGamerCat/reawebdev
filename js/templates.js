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
                    class: "wrapper row test",
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
                    { tag: "img", class: "pofile-img", src: "images/profile-img.jpg" },
                    {
                        tag: "div",
                        class: "wrapper col",
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
                                    { tag: "i", class: "nav-item-icon fa-solid fa-comments" },
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
                    {
                        tag: "div",
                        class: "surface big",
                        children: [
                            { tag: "h1", class: "", text: "Hey, I'm Hidde Aalders!" },
                            { tag: "p", text: "An aspiring web developer passionate about crafting sleek and responsive web experiences." },
                            {
                                tag: "p",
                                children: [
                                    { tag: null, text: "Currently studying web development at " },
                                    { tag: "a", href: "https://www.reacollege.nl/heerhugowaard/", text: "Rea College" },
                                    { tag: null, text: " Heerhugowaard." }
                                ]
                            },
                            {
                                tag: "p",
                                children: [
                                    { tag: null, text: "Want to learn more about me? Check out the " },
                                    { tag: "a", href: "#about", text: "About" },
                                    { tag: null, text: " section and see some of my " },
                                    { tag: "a", href: "#projects", text: "projects" },
                                    { tag: null, text: " too!" }
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                tag: "div",
                class: "content-section",
                id: "About",
                children: [
                    { tag: "h1", class: "content-title", text: "About" },
                    {
                        tag: "div",
                        class: "big surface",
                        children: [
                            {
                                tag: "p",
                                children: [
                                    { tag: null, text: "I'm Hidde Aalders, a aspiring web developer  CONTINUE HERE" }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "div",
                        class: "wrapper row",
                        children: [
                            {
                                tag: "div",
                                class: "surface",
                                children: [
                                    { tag: "h2", text: "Hobbies" },
                                    {
                                        tag: "p",
                                        children: [
                                            { tag: null, text: "In my free time I love to play games like " },
                                            { tag: "a", href: "https://www.minecraft.net/", text: "Minecraft" },
                                            { tag: null, text: ", the Marvel's " },
                                            { tag: "a", href: "https://en.wikipedia.org/wiki/Marvel%27s_Spider-Man_(video_game)", text: "Spider-Man" },
                                            { tag: null, text: "games and " },
                                            { tag: "a", href: "https://www.nintendo.com/nl-nl/Games/Nintendo-Switch-games/The-Legend-of-Zelda-Tears-of-the-Kingdom-1576884.html", text: "The Legend of Zelda: Tears of the Kingdom" },
                                            { tag: null, text: " to name a few." }
                                        ]
                                    },
                                    { tag: "p", text: "I also love coding in my free time learning new things to create personal projects or ideas. I'm also interested in game development." },
                                    {
                                        tag: "p",
                                        children: [
                                            { tag: null, text: "And I enjoy watching movies and shows like the " },
                                            { tag: "a", href: "https://www.marvel.com/movies/iron-man", text: "Iron Man" },
                                            { tag: null, text: "movies, the " },
                                            { tag: "a", href: "https://intothespiderverse.fandom.com/wiki/Spider-Verse_Saga", text: "Spider-Verse" },
                                            { tag: null, text: " movies, " },
                                            { tag: "a", href: "https://en.wikipedia.org/wiki/Prison_Break", text: "Prison Break" },
                                            { tag: null, text: " and " },
                                            { tag: "a", href: "https://www.imdb.com/title/tt1865718/", text: "Gravity Falls " },
                                            { tag: null, text: "." }
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                class: "surface",
                                children: [
                                    { tag: "h2", text: "Work Experience" },
                                    {
                                        tag: "p",
                                        children: [
                                            { tag: null, text: "I currently work at " },
                                            { tag: "a", href: "https://www.hema.nl", text: "HEMA" },
                                            { tag: null, text: " where I have developed strong skills in customer service.  CONTINUE HERE" }
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
                class: "content-section",
                id: "projects",
                children: [
                    { tag: "h1", class: "content-title", text: "Projects" },
                    { tag: "h2", class: "content-subtitle", text: "HTML related projects" },
                    {
                        tag: "div",
                        class: "projects-container wrapper row",
                        children: [
                            {
                                tag: "div",
                                class: "project surface wrapper col"
                            },
                            {
                                tag: "div",
                                class: "project surface wrapper col"
                            }
                        ]
                    }
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
                    { tag: "h1", class: "content-title", text: "Downloads" },
                    {
                        tag: "div",
                        class: "downloads-wrapper wrapper row",
                        children: [
                            {
                                tag: "div",
                                class: "download surface wrapper row space-between",
                                children: [
                                    {
                                        tag: "div",
                                        class: "icon-text-wrapper wrapper row",
                                        children: [
                                            { tag: "i", class: "file-icon fa-solid fa-file-lines"},
                                            { tag: "p", class: "file-name", text: "test.txt" }
                                        ]
                                    },
                                    {
                                        tag: "a",
                                        href: "downloads/test.txt",
                                        download: "test.txt",
                                        class: "download-btn btn wrapper row",
                                        children: [
                                            { tag: "i", class: "btn-icon fa-solid fa-download" },
                                            { tag: "p", text: "Download" }
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                class: "download surface wrapper row space-between",
                                children: [
                                    {
                                        tag: "div",
                                        class: "icon-text-wrapper wrapper row",
                                        children: [
                                            { tag: "i", class: "file-icon fa-solid fa-file-lines"},
                                            { tag: "p", class: "file-name", text: "test.txt" }
                                        ]
                                    },
                                    {
                                        tag: "a",
                                        href: "downloads/test.txt",
                                        download: "test.txt",
                                        class: "download-btn btn wrapper row",
                                        children: [
                                            { tag: "i", class: "btn-icon fa-solid fa-download" },
                                            { tag: "p", text: "Download" }
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                class: "download surface wrapper row space-between",
                                children: [
                                    {
                                        tag: "div",
                                        class: "icon-text-wrapper wrapper row",
                                        children: [
                                            { tag: "i", class: "file-icon fa-solid fa-file-lines"},
                                            { tag: "p", class: "file-name", text: "test.txt" }
                                        ]
                                    },
                                    {
                                        tag: "a",
                                        href: "downloads/test.txt",
                                        download: "test.txt",
                                        class: "download-btn btn wrapper row",
                                        children: [
                                            { tag: "i", class: "btn-icon fa-solid fa-download" },
                                            { tag: "p", text: "Download" }
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                class: "download surface wrapper row space-between",
                                children: [
                                    {
                                        tag: "div",
                                        class: "icon-text-wrapper wrapper row",
                                        children: [
                                            { tag: "i", class: "file-icon fa-solid fa-file-lines"},
                                            { tag: "p", class: "file-name", text: "test.txt" }
                                        ]
                                    },
                                    {
                                        tag: "a",
                                        href: "downloads/test.txt",
                                        download: "test.txt",
                                        class: "download-btn btn wrapper row",
                                        children: [
                                            { tag: "i", class: "btn-icon fa-solid fa-download" },
                                            { tag: "p", text: "Download" }
                                        ]
                                    }
                                ]
                            },
                        ]
                    }
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