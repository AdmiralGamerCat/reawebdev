"use strict";

const apiKey = "d09551ac6f13ad6ef6e36114b2137656";
const fetchConfig = {
    method: "GET",
    mode: "cors",
    cache: "default"
};

const topRatedCache = {};
const movieCache = {};
const movieActorsCache = {};

const fetchMovie = async (movieId, language) => {
    const cacheKey = `${language}_${movieId}`;

    if (movieCache[cacheKey]) {
        return movieCache[cacheKey];
    };

    const result = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`,
        fetchConfig
    );

    const data = await result.json();
    movieCache[cacheKey] = data;
    return data;
};

const fetchMovieActors = async (movieId, language) => {
    const cacheKey = `${language}_${movieId}`;

    if (movieActorsCache[cacheKey]) {
        return movieActorsCache[cacheKey];
    };

    const result = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=${language}`,
        fetchConfig
    );

    const data = await result.json();
    movieActorsCache[cacheKey] = data;
    return data;
};

const fetchTopRatedMovies = async (page, language) => {
    const cacheKey = `${language}_${page}`;

    if (topRatedCache[cacheKey]) {
        return topRatedCache[cacheKey];
    };

    const result = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${page}&language=${language}`,
        fetchConfig
    );

    const data = await result.json();
    topRatedCache[cacheKey] = data;
    return data;
};

export { fetchMovie, fetchMovieActors, fetchTopRatedMovies };