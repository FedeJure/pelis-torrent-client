import { mockedgetImdbId, mockedgetMovieCompleteData, mockedsearchMovies, mockedgetTrendingMovies } from './mockedApi'

const mocked = false;
const allowedSubtitles = ['spa', 'eng', 'por'];

const backendUrl = "http://190.114.255.66:3001";
// const backendUrl = "http://localhost:3001";

const getImdbId = async movieId => mocked ? mockedgetImdbId() : (await fetch(`${backendUrl}/tmdb/movie?movieId=${movieId}`)).json();
const getMovieCompleteData = async imdbId => mocked ? mockedgetMovieCompleteData() : (await fetch(`${backendUrl}/yts/movie?imdbId=${imdbId}`)).json();
const searchMovies = async (query, language) => mocked ? mockedsearchMovies() : (await fetch(`${backendUrl}/tmdb/search?language=${language}&page=1&query=${query}`)).json();
const getTrendingMovies = async (limit, page, genre, callback) => mocked ? mockedgetTrendingMovies(limit, page, callback) : fetch(`${backendUrl}/yts/homeMovies?limit=${limit}&page=${page}${genre ? "&genre=" + genre : ""}`)
    .then(response => response.json())
    .then(result => {
        callback(result);
    });
const getTrendingSeries = async (limit, page, genre, callback) => fetch(`${backendUrl}/tmdb/homeSeries?page=${page}`)
    .then(response => response.json())
    .then(result => {
        callback(result);
    });
const getTmdbImgPath = image => `https://image.tmdb.org/t/p/w500/${image}`;
const getSupportedLanguages = async () => (await fetch(`${backendUrl}/tmdb/languages`)).json();
const getMovieTrailer = (movieId, language) => new Promise(async res => {
    res(await (await fetch(`${backendUrl}/tmdb/trailer?movieId=${movieId}&language=${language}`)).json());
});
const getSubtitles = imdbid => new Promise(async res => {
    res(await (await fetch(`${backendUrl}/openSubtitles/search?imdbid=${imdbid}`)).json());
});


const getSerieSubtitles = (serieId, season, episode) => new Promise(async res => {
    res(await (await fetch(`${backendUrl}/openSubtitles/search/serie?serieId=${serieId}&season=${season}&episode=${episode}`)).json());
});

const getMovieSubtitles = (imdbId) => new Promise(async res => {
    res(await (await fetch(`${backendUrl}/openSubtitles/search/movie?imdbId=${imdbId}`)).json());
});

const getSerieData = async (serieId, callback) => fetch(`${backendUrl}/tmdb/serie?serieId=${serieId}`)
    .then(response => response.json())
    .then(result => {
        callback(result);
    });

const searchSerie = async (id, name, season, episode, callback) => fetch(`${backendUrl}/searchSerie?serieId=${id}&name=${name}&season=${season}&episode=${episode}`)
    .then(response => response.json())
    .then(result => {
        callback(result);
    });

const searchMovie = async (id, name, callback) => fetch(`${backendUrl}/searchMovie?movieId=${id}&name=${name}`)
    .then(response => response.json())
    .then(result => {
        callback(result);
    });

const getSerieAlternativeNames = async serieId => new Promise(async res => {
    res(await (await fetch(`${backendUrl}/tmdb/serie/alternativeNames?serieId=${serieId}`)).json());
});

export { getImdbId,
        getMovieCompleteData,
        searchMovies, 
        getTmdbImgPath,
        getTrendingMovies,
        getTrendingSeries,
        getSupportedLanguages,
        getMovieTrailer,
        getSubtitles,
        getSerieData,
        searchSerie,
        getSerieAlternativeNames,
        getSerieSubtitles,
        getMovieSubtitles,
        searchMovie };