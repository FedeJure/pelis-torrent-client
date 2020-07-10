import { mockedgetImdbId, mockedgetMovieCompleteData, mockedsearchMovies, mockedgetTrendingMovies } from './mockedApi'

const mocked = false;

const backendUrl = "https://pelis-torrent-backend.herokuapp.com";

const getImdbId = async movieId => mocked ? mockedgetImdbId() : (await fetch(`${backendUrl}/tmdb/movie?movieId=${movieId}`)).json();
const getMovieCompleteData = async imdbId => mocked ? mockedgetMovieCompleteData() : (await fetch(`${backendUrl}/yts/movie?imdbId=${imdbId}`)).json();
const searchMovies = async (query, language) => mocked ? mockedsearchMovies() : (await fetch(`${backendUrl}/tmdb/search?language=${language}&page=1&query=${query}`)).json();
const getTrendingMovies = async (limit, page, callback) => mocked ? mockedgetTrendingMovies(limit, page, callback) : fetch(`${backendUrl}/yts/homeMovies?limit=${limit}&page=${page}`)
                            .then(response => response.json())
                            .then(result => {
                                callback(result);
                            });
const getTmdbImgPath = image => `https://image.tmdb.org/t/p/w500/${image}`;
const getSupportedLanguages = async () => (await fetch(`${backendUrl}/tmdb/languages`)).json();

export { getImdbId, getMovieCompleteData, searchMovies, getTmdbImgPath, getTrendingMovies, getSupportedLanguages };