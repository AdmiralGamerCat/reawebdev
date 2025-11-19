"use strict";

import { createElement, fetchFiles, fetchFile } from "./helper-functions";

const tabsContainer = document.querySelector("#tabs-container");

const createTabElement = (file) => {
    const tabElement = createElement(
        "button",
        { class: "tab hidden", "data-tab-id": file.id },
        [
            createElement("img", { class: "icon", src: `./content/icons/${file.icon}` }),
            file.title,
            createElement(
                "button",
                { class: "close-button" },
                [ createElement("img", { class: "icon", src: "./content/icons/close.svg" }) ]
            )
        ]
    );

    tabElement.querySelector(".close-button").addEventListener("click", () => closeFile(file));
    tabElement.addEventListener("click", () => switchFile(file));

    tabsContainer.appendChild(tabElement);
    setTimeout(() => tabElement.classList.remove("hidden"), 10);
};