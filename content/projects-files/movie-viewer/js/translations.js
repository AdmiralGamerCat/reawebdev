"use strict";

import { getAppState } from "./helper-functions.js";

const translations = {
    "en-US": {
        english: "English",
        dutch: "Dutch",
        german: "German",
        actors: "Actors",
        description: "Description",
        releaseDate: (date) => date,
        budget: (amount) =>
            `Budget: ${amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0
            })}`,
        revenue: (amount) =>
            `Revenue: ${amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0
            })}`,
        reviews: (count) => `Based on ${count} reviews`,
        runtime: (hours, minutes) => `${hours}h ${minutes}m`,
        movieViewer: "Movie viewer",
        topRatedMovies: "Top rated movies",
        showingNumbers: (startNumber, endNumber) =>
            `Showing ${startNumber}-${endNumber} of 10000 movies`
    },

    "nl-NL": {
        english: "Engels",
        dutch: "Nederlands",
        german: "Duits",
        actors: "Acteurs",
        description: "Beschrijving",
        releaseDate: (date) =>
            date.split("-").reverse().join("-"),
        budget: (amount) =>
            `Budget: ${amount.toLocaleString("nl-NL", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 0
            })}`,
        revenue: (amount) =>
            `Opbrengst: ${amount.toLocaleString("nl-NL", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 0
            })}`,
        reviews: (count) => `Gebaseerd op ${count} reviews`,
        runtime: (hours, minutes) => `${hours}u ${minutes}m`,
        movieViewer: "Filmkijker",
        topRatedMovies: "Best beoordeelde films",
        showingNumbers: (startNumber, endNumber) =>
            `Toont ${startNumber}-${endNumber} van 10000 films`
    },

    "de-DE": {
        english: "Englisch",
        dutch: "Niederländisch",
        german: "Deutsch",
        actors: "Schauspieler",
        description: "Beschreibung",
        releaseDate: (date) =>
            date.split("-").reverse().join("-"),
        budget: (amount) =>
            `Budget: ${amount.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 0
            })}`,
        revenue: (amount) =>
            `Ertrag: ${amount.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 0
            })}`,
        reviews: (count) => `basierend auf ${count} Bewertungen`,
        runtime: (hours, minutes) => `${hours}Std. ${minutes}Min.`,
        movieViewer: "Filmbetrachter",
        topRatedMovies: "Top-Filme",
        showingNumbers: (startNumber, endNumber) =>
            `${startNumber}–${endNumber} von 10000 Filmen werden angezeigt`
    }
};

const t = (key, ...args) => {
    const selectedLanguage = getAppState("selectedLanguage");
    const languageTranslations = translations[selectedLanguage];

    if (!languageTranslations) {
        console.warn(`Missing translations for language: ${selectedLanguage}`);
        return key;
    };

    const entry = languageTranslations[key];

    if (!entry) {
        console.warn(`Missing translation key: ${key}`);
        return key;
    };

    return typeof entry === "function"
        ? entry(...args)
        : entry;
};

export { t };
