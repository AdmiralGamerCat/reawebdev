"use strict";

import { createElement, updateAppState, getAppState } from "./helper-functions.js";
import { renderMovieViewerPage, renderTopRatedMoviesPage } from "./pages.js";
import { t } from "./translations.js";

const supportedLanguages = {
    "english": "en-US",
    "dutch": "nl-NL",
    "german": "de-DE"
};

const defaultLanguage = Object.values(supportedLanguages)[0];

const ensureDefaultAppState = () => {
    if (!getAppState("currentPage")) {
        updateAppState("currentPage", "topRatedMovies");
    };

    if (!getAppState("selectedLanguage")) {
        updateAppState("selectedLanguage", defaultLanguage);
    };

    if (!getAppState("topRatedMoviesPage")) {
        updateAppState("topRatedMoviesPage", 1);
    };

    if (!getAppState("movieId")) {
        updateAppState("movieId", "569094");
    };
};

const updateLanguageSelect = () => {
    const languageSelect = document.querySelector("#language-select");
    languageSelect.innerHTML = "";

    for (const [key, value] of Object.entries(supportedLanguages)) {
        languageSelect.appendChild(
            createElement("option", { html: t(key), value: value })
        );
    };

    languageSelect.value = getAppState("selectedLanguage");
};

const setupNavigationButtons = () => {
    const navigationButtonsWrapper = document.querySelector("#navigation-buttons-wrapper");

    const movieViewerButton = createElement("button", { html: t("movieViewer"), id: "movie-viewer-button" });
    navigationButtonsWrapper.appendChild(movieViewerButton);

    const topRatedMoviesButton = createElement("button", { html: t("topRatedMovies"), id: "top-rated-movies-button" });
    navigationButtonsWrapper.appendChild(topRatedMoviesButton);

    movieViewerButton.addEventListener("click", () => {
        updateAppState("currentPage", "movieViewer");
        renderApp();
    });

    topRatedMoviesButton.addEventListener("click", () => {
        updateAppState("currentPage", "topRatedMovies");
        renderApp();
    });
};

const updateNavigationButtons = (currentPage) => {
    const movieViewerButton = document.querySelector("#movie-viewer-button");
    const topRatedMoviesButton = document.querySelector("#top-rated-movies-button");

    movieViewerButton.classList.toggle("active", currentPage === "movieViewer");
    movieViewerButton.innerHTML = t("movieViewer");
    movieViewerButton.disabled = currentPage === "movieViewer";

    topRatedMoviesButton.classList.toggle("active", currentPage === "topRatedMovies");
    topRatedMoviesButton.innerHTML = t("topRatedMovies");
    topRatedMoviesButton.disabled = currentPage === "topRatedMovies";
};

const renderApp = async () => {
    const currentPage = getAppState("currentPage");
    updateLanguageSelect();
    updateNavigationButtons(currentPage);

    if (currentPage === "movieViewer") {
        await renderMovieViewerPage();
    } else if (currentPage === "topRatedMovies") {
        await renderTopRatedMoviesPage();
    } else {
        console.error("404: Invalid page");
        // 404 page renderer later on
    };

    window.scrollTo(0, 0);
};

const initialize = () => {
    const languageSelect = document.querySelector("#language-select");
    languageSelect.addEventListener("change", () => {
        updateAppState("selectedLanguage", languageSelect.value);
        renderApp();
    });
    
    setupNavigationButtons();
    renderApp();
};

document.addEventListener("DOMContentLoaded", () => {
    ensureDefaultAppState();
    initialize();
});

export { renderApp };