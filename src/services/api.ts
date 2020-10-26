import { mockedgetImdbId, mockedgetMovieCompleteData, mockedsearchMovies, mockedgetTrendingMovies } from './mockedApi'

const mocked = false;
const allowedSubtitles = ['spa', 'eng', 'por'];

const backendUrl = "https://pelis-torrent-backend.herokuapp.com";
// const backendUrl = "http://localhost:3001";

const getImdbId = async (movieId: number) => mocked ? mockedgetImdbId() : (await fetch(`${backendUrl}/tmdb/movie?movieId=${movieId}`)).json();
const getMovieCompleteData = async (imdbId: string) => mocked ? mockedgetMovieCompleteData() : (await fetch(`${backendUrl}/yts/movie?imdbId=${imdbId}`)).json();
const searchMovies = async (query: string, language: string) => mocked ? mockedsearchMovies() : (await fetch(`${backendUrl}/tmdb/search?language=${language}&page=1&query=${query}`)).json();
const getTrendingMovies = async (limit: number, page: number, genre: string, callback: (result: YTSMovieResponse[]) => void) => fetch(`${backendUrl}/yts/homeMovies?limit=${limit}&page=${page}${genre ? "&genre=" + genre : ""}`)
    .then(response => response.json())
    .then((result: {results: YTSMovieResponse[]}) => {
        callback(result.results);
    });
const getTrendingSeries = async (limit: number, page: number, genre: string, callback: (result: TMDBSerieResponse[]) => void) => fetch(`${backendUrl}/tmdb/homeSeries?page=${page}`)
    .then(response => response.json())
    .then((result: {data: {movies: TMDBSerieResponse[]}}) => {
        callback(result.data.movies);
    });
const getTmdbImgPath = (image: string) => `https://image.tmdb.org/t/p/w500/${image}`;
const getSupportedLanguages = async () => (await fetch(`${backendUrl}/tmdb/languages`)).json();
const getMovieTrailer = (movieId: string, language: string) => new Promise(async res => {
    res(await (await fetch(`${backendUrl}/tmdb/trailer?movieId=${movieId}&language=${language}`)).json());
});
const getSubtitles = (imdbid: string) => new Promise(async res => {
    res(await (await fetch(`${backendUrl}/openSubtitles/search?imdbid=${imdbid}`)).json());
});


const getSerieSubtitles = (serieId: number, season: number, episode: number) => new Promise(async res => {
    res(await (await fetch(`${backendUrl}/openSubtitles/search/serie?serieId=${serieId}&season=${season}&episode=${episode}`)).json());
});

const getMovieSubtitles = (imdbId: string) => new Promise(async res => {
    res(await (await fetch(`${backendUrl}/openSubtitles/search/movie?imdbId=${imdbId}`)).json());
});

const getSerieData = async (serieId: number, callback: (result: object) => void) => fetch(`${backendUrl}/tmdb/serie?serieId=${serieId}`)
    .then(response => response.json())
    .then(result => {
        callback(result);
    });

const searchSerie = async (id: number, name: string, season: number, episode: number, callback: (result: object) => void) => fetch(`${backendUrl}/searchSerie?serieId=${id}&name=${name}&season=${season}&episode=${episode}`)
    .then(response => response.json())
    .then(result => {
        callback(result);
    });

const searchMovie = async (id: number, name: string, callback: (result: object) => void) => fetch(`${backendUrl}/searchMovie?movieId=${id}&name=${name}`)
    .then(response => response.json())
    .then(result => {
        callback(result);
    });

const getSerieAlternativeNames = async (serieId: number) => new Promise(async res => {
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

export interface YTSMovieResponse {
    title: string,
    summary: string,
    medium_cover_image: string | null,
    background_image: string | null,
    torrents: object[],
    year: string,
    id: string,
    rating: string,
    imdb_code: string
}

export interface TMDBSerieResponse {
    name: string,
    overview: string,
    poster_path: string | null,
    backdrop_path: string | null,
    torrents: object[],
    first_air_date: string,
    id: string,
    vote_average: number,
    next_episode_to_air : object | null,
    seasons: {season_number: number, episode_count: number}[] | null
}