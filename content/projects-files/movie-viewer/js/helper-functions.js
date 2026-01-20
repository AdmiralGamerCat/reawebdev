"use strict";

import { renderApp } from "./main.js";

const createElement = (tag, attributes = {}, children = []) => {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
        if (key === "class") {
            element.className = value;
        } else if (key === "html") {
            element.innerHTML = value;
        } else if (key === "disabled") {
            element.disabled = value;
        } else {
            element.setAttribute(key, value);
        };
    };

    children.forEach(child => {
        element.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });

    return element;
};

const updateAppState = (key, value) => {
    const state = JSON.parse(localStorage.getItem("appState")) || {};
    state[key] = value;
    localStorage.setItem("appState", JSON.stringify(state));
};

const getAppState = (key) =>  {
    const state = JSON.parse(localStorage.getItem("appState")) || {};
    return state[key];
};

const createPaginationControls = (currentPage, totalPages) => {
    const maxVisiblePages = 5;
    const half = Math.floor(maxVisiblePages / 2);

    let startPage = currentPage - half;
    let endPage = currentPage + half;

    if (startPage < 1) {
        startPage = 1;
        endPage = maxVisiblePages;
    };

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxVisiblePages + 1; // ????
    };

    startPage = Math.max(startPage, 1)

    const paginationWrapper = createElement("div", { class: "pagination-wrapper" });

    // previous button
    const previousButton = createElement("button", { disabled: currentPage === 1 }, [
        createElement("img", { src: "./assets/arrow-left.svg", class: "icon" })
    ]);

    previousButton.addEventListener("click", () => {
        updateAppState("topRatedMoviesPage", currentPage - 1);
        renderApp();
    });

    paginationWrapper.appendChild(previousButton);

    // page numbers
    for (let page = startPage; page <= endPage; page++) {
        const button = createElement("button", {
            html: page,
            class: page === currentPage ? "active" : ""
        });

        button.addEventListener("click", () => {
            if (currentPage !== page) {
                updateAppState("topRatedMoviesPage", page);
                renderApp();
            };
        });

        paginationWrapper.appendChild(button);
    };

    // next button
    const nextButton = createElement("button", { disabled: currentPage === totalPages }, [
        createElement("img", { src: "./assets/arrow-right.svg", class: "icon" })
    ]);

    paginationWrapper.appendChild(nextButton);

    nextButton.addEventListener("click", () => {
        updateAppState("topRatedMoviesPage", currentPage + 1);
        renderApp();
    });

    return paginationWrapper;
};

export { createElement, updateAppState, getAppState, createPaginationControls };