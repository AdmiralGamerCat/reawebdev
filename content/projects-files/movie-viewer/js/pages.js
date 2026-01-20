"use strict";

import { createElement, getAppState, updateAppState, createPaginationControls } from "./helper-functions.js";
import { fetchMovie, fetchMovieActors, fetchTopRatedMovies } from "./api.js";
import { renderApp } from "./main.js";
import { t } from "./translations.js";

const renderMovieViewerPage = async () => {
    const pageContainer = document.querySelector("#page-container");
    pageContainer.innerHTML = "";
    const movieData = await fetchMovie(getAppState("movieId"), getAppState("selectedLanguage"));
    const selectedLanguage = getAppState("selectedLanguage");

    document.documentElement.style.setProperty(
        "--banner-image",
        `url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path})`
    );

    document.documentElement.style.setProperty(
        "--poster-image",
        `url(https://image.tmdb.org/t/p/w500/${movieData.poster_path})`
    );

    // elements including fetched data
    const scoreOutOfFive = Math.round((movieData.vote_average / 2) * 10) / 10;
    const starsFillPercent = (scoreOutOfFive / 5) * 100;

    // stars rating
    const starsBackground = createElement("div", { class: "stars-background" });
    for (let i = 0; i < 5; i++) {
        starsBackground.appendChild(
            createElement("img", { src: "./assets/star-background.svg", class: "star" })
        );
    };

    const starsFill = createElement("div", { class: "stars-fill" });
    starsFill.style.width = `${starsFillPercent}%`;
    for (let i = 0; i < 5; i++) {
        starsFill.appendChild(
            createElement("img", { src: "./assets/star-fill.svg", class: "star" })
        );
    };

    // genres
    const genresWrapper = createElement("div", { class: "genres-wrapper" });
    if (movieData.genres) movieData.genres.forEach(genre => {
        genresWrapper.appendChild(createElement("span", { html: genre.name, class: "genre" }));
    });

    // language specific formatting
    const runtimeHours = Math.floor(movieData.runtime / 60);
    const runtimeMinutes = movieData.runtime % 60;
    const runtime = t("runtime", runtimeHours, runtimeMinutes);

    const movieBanner = createElement("div", { class: "movie-banner hidden" }, [
        createElement("div", { class: "banner-inner" }, [
            createElement("div", { class: "movie-poster" }),
            createElement("div", { class: "movie-info" }, [
                createElement("h1", { html: movieData.title }),
                createElement("h2", { html: movieData.tagline || "", class: "margin-bottom small" }),
                createElement("div", { class: "rating margin-bottom" }, [
                    createElement("div", { class: "stars" }, [
                        starsBackground,
                        starsFill
                    ]),
                    createElement("span", { class: "rating-number", html: `${scoreOutOfFive} / 5` }),
                    createElement("span", { html: "●", class: "divider" }),
                    createElement("span", { html: t("reviews", movieData.vote_count) })
                ]),
                createElement("div", { class: "movie-meta margin-bottom" }, [
                    createElement("img", { src: "./assets/calender.svg", class: "icon margin-right negative" }),
                    createElement("span", { html: t("releaseDate", movieData.release_date) }),
                    createElement("span", { html: "●", class: "divider" }),
                    createElement("img", { src: "./assets/clock.svg", class: "icon margin-right negative" }),
                    createElement("span", { html: runtime }),
                    createElement("span", { html: "●", class: "divider" }),
                    genresWrapper
                ]),
                createElement("h3", { html: t("description"), class: "margin-bottom small" }),
                createElement("p", { html: movieData.overview, class: "margin-bottom" }),
                createElement("p", { html: t("budget", movieData.budget) }),
                createElement("p", { html: t("revenue", movieData.revenue) })
            ])
        ])
    ]);

    pageContainer.appendChild(movieBanner);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            movieBanner.classList.remove("hidden");
        });
    });

    pageContainer.appendChild(createElement("div", { class: "heading" }, [
        createElement("h1", { html: t("actors") }),
        createElement("div", { class: "heading-line" })
    ]));

    const actorsGrid = createElement("div", { class: "actors-grid" });
    pageContainer.appendChild(actorsGrid);

    const actors = await fetchMovieActors(getAppState("movieId"), selectedLanguage);
    let transitionDelay = 0;

    for (const actor of actors.cast) {
        const actorArticle = createElement("article", { class: "actor hidden" }, [
            createElement("div", { class: "image-wrapper" }, [
                createElement("img", { src: actor.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : "./assets/placeholder-user.png", class: "actor-image" })
            ]),
            createElement("p", { html: actor.name, class: "actor-name bold" }),
            createElement("p", { html: actor.character, class: "actor-character" })
        ]);

        actorArticle.style.transitionDelay = `${transitionDelay * 50}ms`;
        transitionDelay++;

        actorsGrid.appendChild(actorArticle);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                actorArticle.classList.remove("hidden");
            });
        });
    };
};

const renderTopRatedMoviesPage = async () => {
    const pageContainer = document.querySelector("#page-container");
    pageContainer.innerHTML = "";
    const selectedLanguage = getAppState("selectedLanguage");
    let page = getAppState("topRatedMoviesPage");

    if (page > 500) {
        updateAppState("topRatedMoviesPage", 500);
        renderApp();
    };

    if (page < 1) {
        updateAppState("topRatedMoviesPage", 1);
        renderApp();
    };

    const topRatedMoviesData = await fetchTopRatedMovies(page, selectedLanguage);
    const totalPages = Math.min(topRatedMoviesData.total_pages, 500);

    const startNumber = (page - 1) * 20 + 1;
    const endNumber = Math.min(
        startNumber + topRatedMoviesData.results.length - 1,
        topRatedMoviesData.total_results
    );

    pageContainer.appendChild(createElement("div", { class: "heading" }, [
        createElement("div", { class: "wrapper" }, [
            createElement("h1", { html: t("topRatedMovies") }),
            createElement("p", { html: t("showingNumbers", startNumber, endNumber) })
        ]),
        createElement("div", { class: "heading-line" })
    ]));

    const moviesGrid = createElement("div", { class: "movies-grid" });
    pageContainer.appendChild(moviesGrid);

    let transitionDelay = 0;

    topRatedMoviesData.results.forEach(movie => {
        const movieArticle = createElement("article", { class: "movie hidden" }, [
            createElement("div", { class: "image-wrapper" }, [
                createElement("img", { src: movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "./assets/placholder-poster.png", class: "movie-poster" })
            ]),
            createElement("p", { html: movie.title })
        ]);

        movieArticle.style.transitionDelay = `${transitionDelay * 50}ms`;
        transitionDelay++;

        movieArticle.addEventListener("click", () => {
            updateAppState("movieId", movie.id);
            updateAppState("currentPage", "movieViewer");
            renderApp();
        });

        moviesGrid.appendChild(movieArticle);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                movieArticle.classList.remove("hidden");
            });
        });
    });

    pageContainer.appendChild(
        createPaginationControls(page, totalPages)
    );
};

export { renderMovieViewerPage, renderTopRatedMoviesPage };