// event functions
function closeWindow(e) {
    const window = e.target.closest(".window");
    window.classList.remove("fullscreen");
    window.classList.add("hidden");
    window.addEventListener("transitionend", () => {
        window.remove();
    })
}

function resizeWindow(e) {
    const window = e.target.closest(".window");
    const icon = window.querySelector(".window-maximize-restore-btn i");

    if (icon.classList.contains("fa-window-maximize")) {
        icon.className = "fa-regular fa-window-restore";
        window.classList.add("fullscreen");
    } else {
        icon.className = "fa-regular fa-window-maximize";
        window.classList.remove("fullscreen");
    }
}

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
                                { tag: "i", class: "window-icon fa-solid fa-notdef" },
                                { tag: "p", class: "window-title", text: "Default Title" },
                                {
                                    tag: "button",
                                    class: "window-close-btn",
                                    children: [
                                        { tag: "i", class: "fa-solid fa-xmark fa-xl" }
                                    ],
                                    events: [
                                        {
                                            type: "click",
                                            handler: (e) => { closeWindow(e) }
                                        }
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
                        { tag: "button", class: "window-minimize-btn", children: [ { tag: "i", class: "fa-solid fa-window-minimize" } ] },
                        { 
                            tag: "button", 
                            class: "window-maximize-restore-btn", 
                            children: [ { tag: "i", class: "fa-regular fa-window-maximize" } ],
                            events: [ { type: "click", handler: resizeWindow } ]
                        },
                        {
                            tag: "button",
                            class: "window-close-btn",
                            children: [ { tag: "i", class: "fa-solid fa-xmark fa-xl" } ],
                            events: [
                                {
                                    type: "click",
                                    handler: (e) => { closeWindow(e) }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            tag: "div",
            class: "window-content-container"
        }
    ]
}

export const templates = {
    windowTemplate: windowTemplate
}